function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 text-xs text-muted-foreground sm:flex-row sm:px-6">
        <p>&copy; {new Date().getFullYear()} Blog. All rights reserved.</p>
        <p>Crafted for curious minds.</p>
      </div>
    </footer>
  );
}

export default Footer;
