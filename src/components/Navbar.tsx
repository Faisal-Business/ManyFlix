import { useState, useEffect, useRef } from 'react';
import { Bell, ChevronDown, Menu, X, Edit2, Share2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SearchBar } from '@/components/SearchBar';
import { AiSearchPanel } from '@/components/AiSearchPanel';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { useDevice } from '@/context/DeviceContext';
import { useNavbarSearchRegistry } from '@/context/NavbarSearchContext';

const MOBILE_MENU_ID = 'mobile-nav-menu';
const ADS_ENABLED_KEY = 'manyflix_ads_enabled';
const ADS_DISABLED_UNTIL_KEY = 'manyflix_ads_disabled_until';
const LEGACY_ADS_ENABLED_KEY = 'moonflix_ads_enabled';
const LEGACY_ADS_DISABLED_UNTIL_KEY = 'moonflix_ads_disabled_until';
const ADS_DISABLE_DURATION_MS = 12 * 60 * 60 * 1000;

const getAdsStateFromStorage = () => {
  if (typeof window === 'undefined') {
    return { enabled: true, disabledUntil: null as number | null };
  }

  const storedValue = localStorage.getItem(ADS_ENABLED_KEY)
    ?? localStorage.getItem(LEGACY_ADS_ENABLED_KEY);
  const disabledUntilRaw = localStorage.getItem(ADS_DISABLED_UNTIL_KEY)
    ?? localStorage.getItem(LEGACY_ADS_DISABLED_UNTIL_KEY);
  if (localStorage.getItem(ADS_ENABLED_KEY) === null && storedValue !== null) {
    localStorage.setItem(ADS_ENABLED_KEY, storedValue);
    localStorage.removeItem(LEGACY_ADS_ENABLED_KEY);
  }
  if (localStorage.getItem(ADS_DISABLED_UNTIL_KEY) === null && disabledUntilRaw !== null) {
    localStorage.setItem(ADS_DISABLED_UNTIL_KEY, disabledUntilRaw);
    localStorage.removeItem(LEGACY_ADS_DISABLED_UNTIL_KEY);
  }
  const disabledUntil = disabledUntilRaw ? Number(disabledUntilRaw) : null;

  if (storedValue === 'false' && disabledUntil && Date.now() >= disabledUntil) {
    localStorage.removeItem(ADS_ENABLED_KEY);
    localStorage.removeItem(ADS_DISABLED_UNTIL_KEY);
    localStorage.removeItem(LEGACY_ADS_ENABLED_KEY);
    localStorage.removeItem(LEGACY_ADS_DISABLED_UNTIL_KEY);
    return { enabled: true, disabledUntil: null };
  }

  return { enabled: storedValue !== 'false', disabledUntil };
};

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [profileName, setProfileName] = useState('ME');
  const [profileAvatar, setProfileAvatar] = useState('/lovable-uploads/a8918201-a815-4479-ae74-1fce99787310.png');
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [adsEnabled, setAdsEnabled] = useState(() => getAdsStateFromStorage().enabled);
  const location = useLocation();
  const isMobile = useIsMobile();
  const { isTV } = useDevice();
  const { onMoreInfo } = useNavbarSearchRegistry();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setProfileName(profile.name);
      setProfileAvatar(profile.avatar);
    }
  }, []);

  useEffect(() => {
    const { enabled, disabledUntil } = getAdsStateFromStorage();

    if (!enabled && disabledUntil) {
      const delay = disabledUntil - Date.now();

      if (delay <= 0) {
        setAdsEnabled(true);
        localStorage.removeItem(ADS_ENABLED_KEY);
        localStorage.removeItem(ADS_DISABLED_UNTIL_KEY);
        window.location.reload();
        return;
      }

      const timer = window.setTimeout(() => {
        setAdsEnabled(true);
        localStorage.setItem(ADS_ENABLED_KEY, 'true');
        localStorage.removeItem(ADS_DISABLED_UNTIL_KEY);
        window.location.reload();
      }, delay);

      return () => window.clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node) && isMobileMenuOpen) {
        const menuButton = document.querySelector('[data-menu-button]');
        if (menuButton && !menuButton.contains(event.target as Node)) {
          setIsMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) setIsMobileMenuOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const menu = mobileMenuRef.current;
    if (!menu) return;
    const focusable = menu.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    const trapFocus = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || focusable.length === 0) return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else if (document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener('keydown', trapFocus);
    return () => document.removeEventListener('keydown', trapFocus);
  }, [isMobileMenuOpen]);

  const navItems = [
    { name: 'Home', path: '/browse', section: 'home' },
    { name: 'Movies', path: '/movies', section: 'movies' },
    { name: 'TV Shows', path: '/tv-shows', section: 'tv' },
    { name: 'New & Popular', path: '/new-popular', section: 'trending' },
    { name: 'My List', path: '/my-list', section: 'my-list' },
  ];

  const handleNameEdit = () => {
    setIsEditingName(true);
  };

  const handleNameSave = () => {
    setIsEditingName(false);
    const profile = { id: '1', name: profileName, avatar: profileAvatar };
    localStorage.setItem('userProfile', JSON.stringify(profile));
  };

  const handleNameKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNameSave();
    }
  };

  const handleAdsToggle = (checked: boolean) => {
    if (checked) {
      setAdsEnabled(true);
      localStorage.setItem(ADS_ENABLED_KEY, 'true');
      localStorage.removeItem(ADS_DISABLED_UNTIL_KEY);
      window.location.reload();
      return;
    }

    setAdsEnabled(false);
    const disabledUntil = Date.now() + ADS_DISABLE_DURATION_MS;
    localStorage.setItem(ADS_ENABLED_KEY, 'false');
    localStorage.setItem(ADS_DISABLED_UNTIL_KEY, String(disabledUntil));
    window.location.reload();
  };

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-background to-transparent font-netflix pt-safe"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <motion.nav 
        className="flex items-center justify-between px-3 sm:px-4 lg:px-16 py-3 sm:py-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {/* Logo */}
        <div className="flex items-center space-x-4 sm:space-x-6 lg:space-x-8">
          <Link to="/browse" className="flex items-center">
            <motion.div 
              className="cursor-pointer"
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                    src="/manyflix-logo.svg"
                    alt="ManyFlix"
                className="h-6 sm:h-8 lg:h-10 w-auto object-contain"
              />
            </motion.div>
          </Link>
          
          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-3 lg:space-x-6">
            {navItems.map((item) => (
              <li key={item.section}>
                <Link
                  to={item.path}
                  className={`transition-colors font-medium text-sm lg:text-base tv-focus-ring rounded-sm ${
                    location.pathname === item.path 
                      ? 'text-foreground font-semibold' 
                      : 'text-muted-foreground hover:text-foreground'
                  } ${isTV ? 'px-2 py-1' : ''}`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
          <SearchBar />
          <AiSearchPanel />

          {/* Notifications */}
          <Popover open={isNotificationOpen} onOpenChange={setIsNotificationOpen}>
            <PopoverTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 sm:h-10 sm:w-10 relative hover:bg-muted/50 transition-all duration-300 hover:scale-110"
              >
                <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground hover:text-foreground" />
                {/* Notification Badge */}
                <span className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse">
                  2
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent 
              className="w-80 sm:w-96 p-0 bg-background/95 backdrop-blur-md border border-border/50 shadow-xl max-h-[min(85vh,520px)] overflow-y-auto" 
              align="end" 
              sideOffset={8}
            >
              <div className="p-4 sm:p-5 border-b border-border/50">
                <h2 className="font-bold text-base text-foreground">Notifications</h2>
                <p className="text-xs text-muted-foreground mt-0.5">2 new updates for you</p>
              </div>

              {/* Share ManyFlix */}
              <div className="p-4 sm:p-5 border-b border-border/50">
                <div className="flex items-center gap-4 mb-3">
                  <div className="bg-[hsl(var(--netflix-red))] rounded-xl p-3 shadow-lg shrink-0">
                    <Share2 className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-base text-foreground">Share ManyFlix</h3>
                    <p className="text-sm text-muted-foreground">Spread the word with people you love</p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                  Share ManyFlix with friends and family.
                </p>

                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    type="button"
                    className="flex-1 bg-[hsl(var(--netflix-red))] hover:bg-[hsl(var(--netflix-red))]/90 text-white font-medium"
                    onClick={async () => {
                      const shareUrl = window.location.origin;
                      const shareText = 'Discover movies and TV shows with ManyFlix';
                      if (navigator.share) {
                        try {
                          await navigator.share({ title: 'ManyFlix', text: shareText, url: shareUrl });
                        } catch {
                          /* user cancelled */
                        }
                      } else {
                        await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
                      }
                      setIsNotificationOpen(false);
                    }}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Site
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 font-medium"
                    onClick={async () => {
                      await navigator.clipboard.writeText(window.location.origin);
                      setIsNotificationOpen(false);
                    }}
                  >
                    Copy Link
                  </Button>
                </div>
              </div>

              <div className="p-4 sm:p-5 border-t border-border/50">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-foreground">Ad preferences</h3>
                    <p className="text-sm text-muted-foreground">Optional ads help keep the service running.</p>
                  </div>
                  <Switch checked={adsEnabled} onCheckedChange={handleAdsToggle} />
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Profile Section */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Avatar className="w-6 h-6 sm:w-8 sm:h-8">
              <AvatarImage src={profileAvatar} alt={profileName} />
              <AvatarFallback className="bg-[hsl(var(--netflix-red))] text-white text-xs sm:text-sm">
                {profileName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            
            <div className="hidden sm:flex items-center space-x-2">
              {isEditingName ? (
                <Input
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  onBlur={handleNameSave}
                  onKeyPress={handleNameKeyPress}
                  className="w-16 sm:w-20 h-6 sm:h-8 text-xs sm:text-sm bg-background/80 border-border"
                  autoFocus
                />
              ) : (
                <span 
                  className="text-xs sm:text-sm font-medium cursor-pointer hover:text-muted-foreground transition-colors"
                  onClick={handleNameEdit}
                >
                  {profileName}
                </span>
              )}
              
              <Button
                variant="ghost"
                size="icon"
                className="w-5 h-5 sm:w-6 sm:h-6"
                onClick={handleNameEdit}
              >
                <Edit2 className="h-2 w-2 sm:h-3 sm:w-3" />
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            ref={mobileMenuButtonRef}
            variant="ghost"
            size="icon"
            className={`md:hidden h-8 w-8 ${isTV ? 'min-h-11 min-w-11' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-menu-button
            aria-expanded={isMobileMenuOpen}
            aria-controls={MOBILE_MENU_ID}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            id={MOBILE_MENU_ID}
            className="md:hidden bg-background/95 backdrop-blur-md border-t border-border" 
            ref={mobileMenuRef}
            role="navigation"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <motion.ul 
              className="px-4 py-4 space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {navItems.map((item, index) => (
                <motion.li 
                  key={item.section}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.div
                    whileHover={{ 
                      x: 4,
                      color: isMobile ? "#f87171" : undefined,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full text-left text-foreground hover:text-muted-foreground transition-colors text-sm py-2 tv-focus-ring rounded-sm"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};