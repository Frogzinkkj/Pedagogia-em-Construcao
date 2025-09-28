export function Footer() {
  return (
    <footer className="bg-muted/30 border-t mt-12">
      <div className="container mx-auto py-6 px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Português Divertido. Todos os direitos reservados.
          </p>
          <p className="text-sm text-muted-foreground">
            Criado com ❤️ para educadores.
          </p>
        </div>
      </div>
    </footer>
  );
}
