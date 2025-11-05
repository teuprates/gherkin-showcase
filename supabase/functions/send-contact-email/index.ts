import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const resend = {
  emails: {
    send: async (emailData: any) => {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });
      
      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Resend API error: ${error}`);
      }
      
      return { data: await response.json() };
    }
  }
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  project: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, project, message }: ContactEmailRequest = await req.json();

    console.log("Enviando email de contato para:", { name, email, project });

    // Send confirmation email to the user
    const userEmailResponse = await resend.emails.send({
      from: "BDD Portfolio <onboarding@resend.dev>",
      to: [email],
      subject: "Recebemos sua mensagem!",
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
          <h1 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            Obrigado pelo contato, ${name}!
          </h1>
          
          <p style="color: #666; line-height: 1.6;">
            Recebemos sua mensagem sobre <strong>${project}</strong> e retornaremos o contato em breve.
          </p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-left: 4px solid #007bff; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Sua mensagem:</h3>
            <p style="color: #666; margin-bottom: 0;">${message}</p>
          </div>
          
          <p style="color: #666;">
            Obrigado por seu interesse em nossos serviços de desenvolvimento.
          </p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          
          <p style="color: #999; font-size: 14px;">
            Este é um email automático. Por favor, não responda diretamente.
          </p>
        </div>
      `,
    });

    // Send notification email to the admin (replace with your actual email)
    // Uncomment and replace with your email when ready
    /*
    const adminEmailResponse = await resend.emails.send({
      from: "BDD Portfolio <onboarding@resend.dev>",
      to: ["your-email@example.com"], // Replace with your actual email
      subject: `Novo contato do site: ${name}`,
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
          <h1 style="color: #333; border-bottom: 2px solid #dc3545; padding-bottom: 10px;">
            Novo Contato Recebido
          </h1>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Informações do Contato:</h3>
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Projeto:</strong> ${project}</p>
          </div>
          
          <div style="background-color: #fff3cd; padding: 20px; border-left: 4px solid #ffc107; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Mensagem:</h3>
            <p style="color: #666; white-space: pre-wrap;">${message}</p>
          </div>
          
          <p style="color: #666; font-size: 14px;">
            Enviado em: ${new Date().toLocaleString('pt-BR')}
          </p>
        </div>
      `,
    });
    */

    console.log("Email enviado com sucesso para usuário:", userEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Email enviado com sucesso!",
        userEmailId: userEmailResponse.data?.id
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Erro na função send-contact-email:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "Erro interno do servidor" 
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);