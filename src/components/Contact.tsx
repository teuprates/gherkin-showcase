import { GherkinBlock, GherkinLine } from "./GherkinSyntax";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactFormData } from "@/schemas/contactSchema";
import { sanitizeInput, contactFormRateLimiter } from "@/lib/security";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      project: '',
      message: '',
      website: '' // Honeypot field
    }
  });

  const onSubmit = async (data: ContactFormData) => {
    // Check honeypot field
    if (data.website) {
      toast({
        title: "Erro de segurança",
        description: "Submission bloqueado por medidas de segurança.",
        variant: "destructive"
      });
      return;
    }

    // Check rate limiting
    if (!contactFormRateLimiter.canSubmit()) {
      const waitTime = Math.ceil(contactFormRateLimiter.getTimeUntilNextSubmission() / 1000);
      toast({
        title: "Muitas tentativas",
        description: `Aguarde ${waitTime} segundos antes de enviar novamente.`,
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Sanitize all inputs
      const sanitizedData = {
        name: sanitizeInput(data.name),
        email: sanitizeInput(data.email),
        project: sanitizeInput(data.project),
        message: sanitizeInput(data.message)
      };

      // Send data to Supabase
      const { error } = await supabase
        .from('contacts')
        .insert([sanitizedData]);

      if (error) {
        throw error;
      }

      // Send email notification
      try {
        const { error: emailError } = await supabase.functions.invoke('send-contact-email', {
          body: sanitizedData
        });

        if (emailError) {
          console.error('Erro ao enviar email:', emailError);
          // Don't throw here - we still want to show success if data was saved
        }
      } catch (emailError) {
        console.error('Falha ao enviar email:', emailError);
        // Don't throw here - we still want to show success if data was saved
      }

      toast({
        title: "Mensagem enviada!",
        description: "Obrigado pelo contato. Respondo em até 24 horas.",
      });

      form.reset();
    } catch (error) {
      toast({
        title: "Erro ao enviar",
        description: "Tente novamente ou entre em contato diretamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 px-6 bg-secondary/10">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 gherkin-and">
          Feature: Contato Profissional
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <GherkinBlock>
            <GherkinLine keyword="Scenario" text="Cliente entra em contato" />
            <GherkinLine keyword="Given" text="que você tem um desafio de produto" indent={1} />
            <GherkinLine keyword="And" text="precisa de um Product Owner experiente" indent={1} />
            <GherkinLine keyword="When" text="você preenche o formulário" indent={1} />
            <GherkinLine keyword="Then" text="recebo sua mensagem" indent={1} />
            <GherkinLine keyword="And" text="respondo em até 24 horas" indent={1} />
            <GherkinLine keyword="And" text="agendamos uma conversa estratégica" indent={1} />
            
            <div className="mt-6 pt-4 border-t border-border/50">
              <GherkinLine keyword="#" text="Disponível para:" indent={0} />
              <GherkinLine keyword="#" text="• Product Management e Strategy" indent={1} />
              <GherkinLine keyword="#" text="• Facilitação Scrum e Agile Coaching" indent={1} />
              <GherkinLine keyword="#" text="• Transformação Digital" indent={1} />
              <GherkinLine keyword="#" text="• Consultoria em Metodologias Ágeis" indent={1} />
              <GherkinLine keyword="#" text="• Salvador, Bahia - Brasil" indent={1} />
            </div>
          </GherkinBlock>

          <div className="space-y-6">
            <GherkinBlock>
              <GherkinLine keyword="Scenario" text="Formulário de contato" />
            </GherkinBlock>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Honeypot field - hidden from users */}
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      style={{ display: 'none' }}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  )}
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Seu nome completo" 
                          {...field}
                          maxLength={100}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="seu@email.com" 
                          {...field}
                          maxLength={254}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="project"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Necessidade</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Product Strategy, Scrum, Transformação Digital..." 
                          {...field}
                          maxLength={200}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mensagem</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Descreva seu desafio de produto ou processo..."
                          className="min-h-[120px]"
                          {...field}
                          maxLength={2000}
                        />
                      </FormControl>
                      <FormDescription>
                        {field.value?.length || 0}/2000 caracteres
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};