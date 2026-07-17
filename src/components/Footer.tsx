import { useLanguage } from '@/components/language-provider';

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-primary py-8">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-primary-foreground/80 text-sm">
            © {new Date().getFullYear()} {t('footer.copyright')}
          </p>
          <p className="text-primary-foreground/60 text-xs mt-2">
            {t('footer.description')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
