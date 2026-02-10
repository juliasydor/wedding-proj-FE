'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Facebook, Instagram, ChevronUp } from 'lucide-react';
import IconImage from '@/app/assets/Icon.png';
import { ROUTES } from '@/shared/config';

export function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-card border-t border-border/50">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Scroll to top button */}
        <div className="flex justify-end mb-8">
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-lg bg-secondary hover:bg-secondary/90 text-secondary-foreground flex items-center justify-center transition-colors"
            aria-label="Scroll to top"
          >
            <ChevronUp className="h-5 w-5" />
          </button>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Column 1 - Help */}
          <div>
            <h3 className="text-tertiary font-semibold text-lg mb-4 italic">
              {t('help.title')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href={ROUTES.signup} className="text-foreground/80 hover:text-secondary transition-colors">
                  {t('help.createSite')}
                </Link>
              </li>
              <li>
                <Link href={ROUTES.signup} className="text-foreground/80 hover:text-secondary transition-colors">
                  {t('help.giftList')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-foreground/80 hover:text-secondary transition-colors">
                  {t('help.giveGift')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-foreground/80 hover:text-secondary transition-colors">
                  {t('help.questions')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 - Best */}
          <div>
            <h3 className="text-tertiary font-semibold text-lg mb-4 italic">
              {t('best.title')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-foreground/80 hover:text-secondary transition-colors">
                  {t('best.showcase')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-foreground/80 hover:text-secondary transition-colors">
                  {t('best.event')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - About */}
          <div>
            <h3 className="text-tertiary font-semibold text-lg mb-4 italic">
              {t('about.title')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-foreground/80 hover:text-secondary transition-colors">
                  {t('about.joinTeam')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-foreground/80 hover:text-secondary transition-colors">
                  {t('about.ourStory')}
                </Link>
              </li>
              <li>
                <p className="text-foreground/80">
                  {t('about.contactHours')}{' '}
                  <span className="text-secondary">{t('about.schedule')}</span>
                </p>
              </li>
              <li>
                <a href="mailto:contato@veugravata.com" className="text-foreground/80 hover:text-secondary transition-colors">
                  contato@veugravata.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <div className="flex items-center justify-center gap-6 py-8 border-t border-border/30">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center text-foreground/60 hover:text-secondary hover:border-secondary transition-colors"
            aria-label="Facebook"
          >
            <Facebook className="h-5 w-5" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center text-foreground/60 hover:text-secondary hover:border-secondary transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href="https://pinterest.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center text-foreground/60 hover:text-secondary hover:border-secondary transition-colors"
            aria-label="Pinterest"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
            </svg>
          </a>
          <a
            href="https://spotify.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center text-foreground/60 hover:text-secondary hover:border-secondary transition-colors"
            aria-label="Spotify"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="py-4 border-t border-border/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center text-sm">
          <p className="text-foreground/80 mb-1">
            © 2024-{year} Véu & Gravata - {t('bottom.developedWith')}{' '}
            <Image src={IconImage} alt="Véu & Gravata" width={96} height={96} className="inline object-contain align-middle" />{' '}
          </p>
          <p className="text-foreground/60 text-xs mb-2">
            VÉU & GRAVATA - SITE DE CASAMENTO E EVENTOS
          </p>
          <div className="flex items-center justify-center gap-2 text-xs">
            <Link href="#" className="text-secondary hover:underline">
              {t('bottom.terms')}
            </Link>
            <span className="text-foreground/40">|</span>
            <Link href="#" className="text-secondary hover:underline">
              {t('bottom.privacy')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
