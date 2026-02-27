/**
 * @PATH [docs/00_dev/ui_design/workbench.js]
 * @REV [20260225-0856]
 * @MODULE [PRT]
 * @STATUS [DEV]
 * @FILETYPE [NCA]
 * @DESC [UI Workbench for testing UI components and themes before committal to platform.]
 * @COMPLIANCE [None]
 * -------------------------------------
 * @TODO_START
 * [?] Adding in Modern Components to cull potentials from non.
 * @TODO_END
 * =====================================*/
// 1. SETUP REACT GLOBALS
const { useState, useEffect } = React;

// 2. DATA LAYER
const AvailableThemes = Object.keys(window.AE_THEMES || {});
const AvailableFonts = window.AE_FONTS || ['Inter'];

const ICON_PATHS = {
    'loading': 'M227-346q-16-30-25.5-63.5T192-480q0-121 85-206t209-82l-57-57 51-51 144 144-144 144-51-51 57-57q-94-2-158 62t-64 154q0 22 4 42t12 39l-53 53ZM480-84 336-228l144-144 51 51-57 57q94 2 158-62t64-154q0-22-4-42t-12-39l53-53q16 30 25.5 63.5T768-480q0 120-85 205.5T474-192l57 57-51 51Z',
    'delete': 'M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z',
    'edit': 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z',
    'add': 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z',
    'close': 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
    'check': 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
    'code': 'M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z',
    'chevronDown': 'M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z',
    'unknown': 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z',
    'warningTriangle': 'm48-144 432-720 432 720H48Zm127-72h610L480-724 175-216Zm330.5-58.29q10.5-10.29 10.5-25.5t-10.29-25.71q-10.29-10.5-25.5-10.5t-25.71 10.29q-10.5 10.29-10.5 25.5t10.29 25.71q10.29 10.5 25.5 10.5t25.71-10.29ZM444-384h72v-192h-72v192Zm36-86Z'
  };

const Icon = ({ name, className, size = 20 }) => {
    const path = ICON_PATHS[name] || ICON_PATHS['unknown'];
    
    return (
        <svg 
            viewBox="0 0 24 24" 
            width={size} 
            height={size} 
            fill="currentColor" // This ensures it takes the text color of the parent (e.g., text-white)
            className={`inline-block select-none ${className || ''}`}
        >
            <path d={path} />
        </svg>
    );
};

const Button = ({ text, action, onClick, className, children }) => {
    const map = {
        positive: 'bg-surface-positive hover:brightness-125 text-text-primary transition-{brightness} duration-300 border-color:border-secondary',
        informational: 'bg-surface-informational hover:brightness-125 text-text-primary transition-{brightness} duration-300 border-color:border-secondary',
        destructive: 'bg-surface-destructive hover:brightness-125 text-text-primary transition-{brightness} duration-300 border-color:border-secondary',
        warning: 'bg-surface-warning hover:brightness-125 text-text-primary transition-{brightness} duration-300 border-color:border-secondary',
        navigational: 'bg-surface-navigational hover:brightness-125 text-text-primary transition-{brightness} duration-300 border-color:border-primary',
        default: 'bg-surface-neutral text-white'
    };
    
    const actionKey = {
        'save': 'positive',
        'delete': 'destructive',
        'edit': 'warning',
        'informational': 'informational',
        'navigational': 'navigational'
    }[action] || action;

    const colorClass = map[actionKey] || map.default;

    return (
      
        <button onClick={onClick} className={`inline-flex items-center justify-center w-auto h-9 px-2 border border-transparent text-xs font-medium rounded-md shadow-md ${colorClass} ${className}`}>
            {text || children || action}
        </button>
    );
};

const MainLayout = ({ children, headerConfig }) => (
    <div 
        className="min-h-screen bg-[var(--surface-primary)] text-[var(--text-primary)] transition-colors duration-300 font-sans"
        style={{
            fontFamily: 'var(--font-main)',
            backgroundImage: 'var(--bg-image)',
            backgroundAttachment: 'var(--bg-attachment)'
        }}
    >
        {headerConfig && (
            <div className="bg-[var(--surface-secondary)] border-b border-[var(--border-primary)] p-4 mb-4 flex justify-between items-center shadow-sm">
                <h1 className="text-xl font-bold tracking-wide">{headerConfig.title}</h1>
                <div className="text-xs text-[var(--text-tertiary)] font-mono">v0.1.0-sandbox</div>
            </div>
        )}
        {children}
    </div>
);

const Badge = ({ count, pulse = true }) => {
  if (count <= 0) return null;

  return (
    <div className="relative inline-flex">
      {pulse && (
        <span className="absolute inset-0 rounded-full bg-surface-alert opacity-75 animate-ping" />
      )}
      <span className="relative bg-surface-alert text-text-alert text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">
        {count}
      </span>
    </div>
  );
};

const StatusPill = ({ status }) => {
  const map = {
    'Open': 'bg-blue-900/50 text-blue-300 border-blue-800/50',
    'In Progress': 'bg-yellow-900/50 text-yellow-300 border-yellow-800/50',
    'Closed': 'bg-green-900/50 text-green-400 border-green-800/50',
    'Inactive': 'bg-red-900/50 text-surface-warning border-red-800/50',
    'Void': 'bg-surface-secondary text-text-secondary border-outline-variant',
    'Deployed-Testing': 'bg-purple-900/50 text-purple-400 border-purple-800/50',
    'default': 'bg-surface-secondary text-text-primary border-outline-variant'
  };

  const styleClass = map[status] || map.default;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styleClass}`}>
      {status}
    </span>
  );
};

const FormField = ({
  label,
  error,
  type = 'text',
  className = '',
  options = [],
  prefix = null,
  suffix = null,
  children,
  ...props
}) => {
  const generatedId = 'field-' + Math.random().toString(36).substr(2, 9);
  const inputId = props.id || props.name || generatedId;

  let config = {
    inputType: type,
    inputPrefix: prefix,
    inputSuffix: suffix,
    alignment: 'text-left',
    step: props.step || 'any',
    hideSpinners: false,
  };

  switch (type) {
    case 'currency':
      config = { ...config, inputType: 'number', inputPrefix: prefix || '$', alignment: 'text-right', step: props.step || '0.01', hideSpinners: true };
      break;
    case 'percent':
      config = { ...config, inputType: 'number', inputSuffix: suffix || '%', alignment: 'text-right', step: props.step || '0.1', hideSpinners: true };
      break;
    case 'number':
      config = { ...config, inputType: 'number', alignment: 'text-right', hideSpinners: false };
      break;
    default:
      break;
  }

  const getPaddingClass = () => {
    if (config.inputPrefix && config.inputSuffix) return 'pl-7 pr-7';
    if (config.inputPrefix) return 'pl-7 pr-3';
    if (config.inputSuffix) return 'pl-3 pr-7';
    return 'px-3';
  };

  const baseInputStyles = `
    w-full bg-surface-secondary border rounded-md py-2
    ${getPaddingClass()} ${config.alignment}
    text-text-primary placeholder-text-tertiary
    focus:outline-none focus:ring-1 focus:ring-accent-primary
    transition-colors duration-100
    disabled:opacity-50 disabled:cursor-not-allowed
    ${error ? 'border-red-500 focus:border-red-500' : 'border-border-primary focus:border-accent-primary'}
  `;

  const renderInput = () => {
    // A. Text Area
    if (type === 'textarea') {
      return <textarea id={inputId} className={`${baseInputStyles} min-h-[100px] resize-y px-3 text-left`} {...props} />;
    }

    // B. Select Dropdown
    if (type === 'select') {
      return (
        <div className="relative">
          <select id={inputId} className={`${baseInputStyles} appearance-none px-3 pr-10 text-left cursor-pointer`} {...props}>
            <option value="" disabled>Select an option...</option>
            {options.map((opt, i) => {
               const val = typeof opt === 'object' ? (opt.id || opt.value) : opt;
               const lbl = typeof opt === 'object' ? (opt.name || opt.label) : opt;
               return <option key={val || i} value={val}>{lbl}</option>;
            })}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-text-secondary">
            <Icon name="chevronDown" />
          </div>
        </div>
      );
    }
    // C. Standard Input (Text, Number, Currency, Percent)
    return (
      <div className="relative w-full">
        {config.inputPrefix && (
          <span className="absolute left-2.5 top-2.5 text-xs text-text-secondary z-10 select-none font-medium">{config.inputPrefix}</span>
        )}
        <input id={inputId} type={config.inputType} step={config.step} className={baseInputStyles} {...props} />
        {config.inputSuffix && (
          <span className="absolute right-3 top-2.5 text-xs text-text-secondary z-10 select-none font-medium">{config.inputSuffix}</span>
        )}
      </div>
    );
  };

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="text-xs font-bold text-text-secondary uppercase tracking-wider">
          {label} {props.required && <span className="text-accent-primary ml-1">*</span>}
        </label>
      )}
      {renderInput()}
      {error && <span className="text-xs text-red-500 font-medium animate-pulse">{error}</span>}
    </div>
  );
};

const Skeleton = ({ className, variant = 'text', width, height }) => {
    const shapeClasses = {
        circle: 'rounded-full',     // For Avatars
        rect: 'rounded-lg',         // For Images/Cards
        text: 'rounded h-4'         // For Typography (defaults to text height)
    };

    return (
        <div 
            className={`
                animate-pulse 
                bg-surface-tertiary 
                opacity-20 
                ${shapeClasses[variant] || shapeClasses.rect} 
                ${className || ''}
            `}
            style={{ width, height }}
        />
    );
};

// Generic Shims
const Toggle = ({ label, enabled = false, onChange, className, disabled }) => {
    const [isOn, setIsOn] = useState(enabled);

    const handleClick = () => {
        if (disabled) return;
        setIsOn(!isOn);
        if (onChange) onChange(!isOn);
    };
    
    return (
        <div 
            className={`flex items-center gap-2 cursor-pointer select-none ${disabled ? 'opacity-50 pointer-events-none' : ''} ${className || ''}`}
            onClick={handleClick}
        >
            {/* Track */}
            <div className={`
                relative w-11 h-6 rounded-full transition-colors duration-200 border
                ${isOn ? 'bg-surface-secondary border-border-primary' : 'bg-accent-primary border-border-secondary'}
            `}>
                {/* Thumb - using INLINE STYLE to force the slide */}
                <div 
                    className="absolute top-0.5 left-0.5 w-4.5 h-4.5 rounded-full bg-accent-trigger shadow-sm transition-transform duration-200 ease-in-out"
                    style={{ transform: isOn ? 'translateX(20px)' : 'translateX(0px)' }} 
                />
            </div>
            
            {/* Label */}
            {label && <span className="text-sm font-medium text-text-primary">{label}</span>}
        </div>
    );
};

const Checkbox = ({ label, checked, onChange }) => (
    <label className="flex items-center gap-2 cursor-pointer select-none">
        <input type="checkbox" checked={checked} onChange={onChange} className="w-4 h-4 accent-[var(--accent-primary)]" />
        <span className="text-sm font-medium">{label}</span>
    </label>
);

const Avatar = ({ src, name, size }) => (
    <div className={`rounded-full bg-surface-primary flex items-center justify-center text-text-primary font-bold overflow-hidden border-2 border-[var(--surface-primary)] shadow-sm ${size === 'lg' ? 'w-12 h-12' : 'w-8 h-8'}`}>
        {src ? <img src={src} className="w-full h-full object-cover" /> : (name || 'U').charAt(0)}
    </div>
);

const LoadingSpinner = () => <span className="flex justify-center items-center animate-spin h-8 w-8 border-2 border-current border-t-transparent rounded-full text-[var(--accent-primary)]"><Icon name="loading" className="text-accent-primary" size={24} /></span>;

const Tooltip = ({ content, children }) => <span title={content} className="cursor-help decoration-dotted underline">{children}</span>;

const StatCard = ({ title, value, trend }) => (
    <div className="p-4 rounded bg-[var(--surface-secondary)] border border-[var(--border-primary)] shadow-sm">
        <div className="text-[var(--text-secondary)] text-xs uppercase font-bold tracking-wider mb-1">{title}</div>
        <div className="text-2xl font-bold text-[var(--text-primary)]">{value}</div>
        <div className="text-xs font-medium text-green-500 mt-1">{trend}</div>
    </div>
);

const EmptyState = ({ title, message, action }) => (
    <div className="text-center p-8 text-[var(--text-tertiary)] flex flex-col items-center justify-center h-full">
        <div className="font-bold text-[var(--text-secondary)] mb-1 text-lg">{title}</div>
        <p className="text-sm mb-6 max-w-xs">{message}</p>
        {action}
    </div>
);

const Modal = ({ isOpen, onClose, title, children, className }) => {
    if (!isOpen) return null;
    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm ${className}`}>
            <div className="bg-[var(--surface-primary)] border border-[var(--border-primary)] rounded-lg shadow-2xl w-full max-w-md p-6 m-4 text-[var(--text-primary)]">
                <div className="flex justify-between items-center mb-6 border-b border-[var(--border-secondary)] pb-4">
                    <h3 className="text-lg font-bold">{title}</h3>
                    <button onClick={onClose} className="text-[var(--text-tertiary)] hover:text-red-500 font-bold text-xl leading-none">&times;</button>
                </div>
                {children}
            </div>
        </div>
    );
};

// ListItem
// ListControls
// ListCard
// HistoryPanel
// DashboardWidget
// "Modern" Components section

// @COMPONENT
const RadioCardGroup = ({ 
  label = 'RAM', 
  options = ['4 GB', '8 GB', '16 GB', '32 GB', '64 GB', '128 GB'],
  disabledOptions = ['128 GB'],
  initialSelected = '16 GB',
  onChange
}) => {
  // @STATE
  const [selected, setSelected] = useState(initialSelected);

  // @HANDLERS
  const handleSelect = (option) => {
    setSelected(option);
    if (onChange) onChange(option);
  };

  return (
    <div className="w-full">
      {/* Header Area */}
      <div className="flex items-center justify-between mb-4">
        <label className="text-xs font-bold tracking-wider text-text-secondary uppercase">
          {label}
        </label>
        <button className="text-[10px] font-bold uppercase tracking-wider text-accent-primary hover:brightness-125 transition-all">
          See Specs
        </button>
      </div>

      {/* Grid Area */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {options.map((option) => {
          const isSelected = selected === option;
          const isDisabled = disabledOptions.includes(option);

          return (
            <button
              key={option}
              disabled={isDisabled}
              onClick={() => handleSelect(option)}
              className={`
                flex items-center justify-center rounded-lg border px-3 py-4 text-sm font-bold transition-all
                ${isSelected 
                  ? 'bg-accent-primary border-accent-primary text-text-primary shadow-md' 
                  : 'bg-surface-secondary border-border-primary text-text-primary hover:border-accent-primary'
                }
                ${isDisabled ? 'opacity-30 cursor-not-allowed border-dashed hover:border-border-primary' : 'cursor-pointer'}
              `}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// @COMPONENT
const NotificationToast = ({ 
  title = 'Emilia Gates', 
  message = 'Sure! 8:30pm works great!', 
  actionLabel = 'Reply',
  avatarSrc,
  onAction,
  onDismiss
}) => {
  return (
    <div className="flex w-full max-w-sm overflow-hidden rounded-lg bg-surface-secondary shadow-lg border border-border-primary">
      <div className="flex w-full p-4 items-center">
        
        {/* Replaced hardcoded image with your workbench Avatar component */}
        <div className="flex-shrink-0">
          <Avatar src={avatarSrc} name={title} size="md" />
        </div>
        
        <div className="ml-4 flex-1 overflow-hidden">
          <p className="text-sm font-bold text-text-primary leading-tight truncate">
            {title}
          </p>
          <p className="mt-0.5 text-xs font-medium text-text-secondary truncate">
            {message}
          </p>
        </div>
        
        <div className="ml-4 flex flex-shrink-0 items-center gap-3 border-l border-border-primary pl-4">
          {actionLabel && (
            <button
              type="button"
              onClick={onAction}
              className="text-xs font-bold uppercase tracking-wider text-accent-primary hover:brightness-125 transition-all"
            >
              {actionLabel}
            </button>
          )}
          
          {/* Added a standard dismiss icon */}
          {onDismiss && (
            <button 
              onClick={onDismiss} 
              className="text-text-tertiary hover:text-surface-destructive transition-colors"
              title="Dismiss"
            >
              <Icon name="close" size={16} />
            </button>
          )}
        </div>
        
      </div>
    </div>
  );
};
// @COMPONENT
const ModernAlert = ({ 
  title = 'Attention needed', 
  message = 'Please update your billing information.',
  type = 'warning' 
}) => {
  
  // Map standard semantic intents to your actual workbench Tailwind config
  const styles = {
    warning: {
      wrapper: 'bg-surface-warning border-border-primary',
      text: 'text-text-warning',
      icon: 'warningTriangle'
    },
    error: {
      wrapper: 'bg-surface-error border-border-primary',
      text: 'text-text-error',
      icon: 'close' // Assuming 'close' acts as an error/stop icon in your set
    },
    success: {
      wrapper: 'bg-surface-success border-border-primary',
      text: 'text-text-success',
      icon: 'check'
    }
  };

  const current = styles[type] || styles.warning;

  return (
    <div className={`rounded-md p-4 border shadow-sm ${current.wrapper}`}>
      <div className="flex">
        <div className="flex-shrink-0 pt-0.5">
          <Icon name={current.icon} className={current.text} size={20} />
        </div>
        <div className="ml-3">
          <h3 className={`text-sm font-bold tracking-wide ${current.text}`}>
            {title}
          </h3>
          {message && (
            <div className={`mt-1 text-xs font-medium ${current.text} opacity-90`}>
              <p>{message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
// ==========================================
// 4. THE WORKBENCH CONTROLLER
// ==========================================

const Workbench = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [previewTheme, setPreviewTheme] = useState('LIGHT'); 
  const [currentFont, setCurrentFont] = useState('Inter');

  // Variables
  useEffect(() => {
    const themeVars = window.AE_THEMES[previewTheme] || window.AE_THEMES['LIGHT'];
    const root = document.documentElement;
    
    // Apply Font Variables
    root.style.setProperty('--font-main', currentFont);
    
    // Apply Theme Variables
    Object.entries(themeVars).forEach(([key, value]) => {
        root.style.setProperty(key, value);
    });
  }, [previewTheme, currentFont]);

  return (
    <MainLayout headerConfig={{ title: 'Design System Workbench' }}>
      
      <div className="min-h-screen transition-colors duration-300 p-8">
          
          {/* CONTROL BAR */}
          <div className="flex flex-col md:flex-row justify-between items-end md:items-center border-b border-[var(--border-primary)] pb-6 mb-8 gap-4">
            
            {/* Left Side: Title */}
            <div className="flex gap-2">
                <span className="px-3 py-1 bg-[var(--accent-primary)] text-text-primary text-xs font-bold rounded uppercase tracking-wider">Components</span>
            </div>

            {/* Right Side: Global Controls */}
            <div className="flex items-center gap-4">
                
                {/* Font Selector */}
                <div className="flex items-center gap-2 bg-[var(--surface-secondary)] p-2 rounded-lg border border-[var(--border-primary)]">
                    <label className="text-[10px] uppercase font-bold text-[var(--text-tertiary)] tracking-wider px-1">Type</label>
                    <select 
                        value={currentFont}
                        onChange={(e) => setCurrentFont(e.target.value)}
                        className="bg-surface-secondary text-sm font-semibold text-[var(--text-primary)] focus:outline-none cursor-pointer w-48"
                    >
                        {AvailableFonts.map(font => (
                        <option key={font} value={font} className="text-text-primary">{font}</option>
                        ))}
                    </select>
                </div>

                {/* Theme Selector */}
                <div className="flex items-center gap-2 bg-[var(--surface-secondary)] p-2 rounded-lg border border-[var(--border-primary)]">
                    <label className="text-[10px] uppercase font-bold text-[var(--text-tertiary)] tracking-wider px-1">Theme</label>
                    <select 
                        value={previewTheme}
                        onChange={(e) => setPreviewTheme(e.target.value)}
                        className="bg-surface-secondary text-sm font-semibold text-[var(--text-primary)] focus:outline-none cursor-pointer w-60"
                    >
                        {AvailableThemes.map(t => (
                        <option key={t} value={t} className="text-text-primary">
                            {t.charAt(0).toUpperCase() + t.slice(1).replace(/_/g, ' ')}
                        </option>
                        ))}
                    </select>
                </div>

            </div>
          </div>

          {/* MAIN GRID */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              
            {/* BUTTONS */}
            <div className="p-6 bg-[var(--surface-secondary)] rounded-lg border border-[var(--border-primary)] space-y-6 shadow-sm">
              <h3 className="text-xs font-bold text-[var(--text-tertiary)] uppercase tracking-wider">Buttons</h3>
              <div className="flex flex-wrap gap-3 items-center">
                <Button action="positive" text="Positive" onClick={() => {}} />
                <Button action="informational" text="Informational" onClick={() => {}} />
                <Button action="destructive" text="Destructive" onClick={() => {}} />
                <Button action="warning" text="Warning" onClick={() => {}} />
                <Button action="navigational" text="Navigational" onClick={() => {}} />
                <Button action="default" className="opacity-50 cursor-not-allowed">Disabled</Button>
              </div>
              
              <h3 className="text-xs font-bold text-[var(--text-tertiary)] uppercase tracking-wider mt-6">Toggles & Checks</h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-6">
                    <Toggle label="Notifications" />
                    <Toggle label="Dark Mode" />
                </div>
                <div className="flex items-center gap-6">
                    <Checkbox label="Agree to Terms" onChange={() => {}} />
                    <Checkbox label="Subscribe to Newsletter" onChange={() => {}} />
                </div>
              </div>
            </div>

            {/* FEEDBACK */}
            <div className="p-6 bg-[var(--surface-secondary)] rounded-lg border border-[var(--border-primary)] space-y-6 shadow-sm">
              <h3 className="text-xs font-bold text-[var(--text-tertiary)] uppercase tracking-wider">Status & Feedback</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <StatusPill status="Open" />
                <StatusPill status="In Progress" />
                <StatusPill status="Closed" />
                <StatusPill status="Inactive" />
                <StatusPill status="Void" />
                <StatusPill status="Deployed-Testing" />             
              </div>  
              <div className="flex flex-wrap gap-4 items-center">                 
                <Badge count={3} />
                <Badge count={99} />
                <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                    <span>Loading:</span>
                    <LoadingSpinner />
                </div>
              </div>
              <h3 className="text-xs font-bold text-[var(--text-tertiary)] uppercase tracking-wider mt-6">Avatars</h3>
              <div className="flex items-center gap-4">
                <Avatar src="https://i.pravatar.cc/150?u=19" size="lg" />
                <Avatar name="Todd" size="md" />
                <Avatar name="AE" size="sm" />
              </div>
            </div>

            {/* INPUTS TEST AREA */}
            <div className="p-6 bg-[var(--surface-secondary)] rounded-lg border border-[var(--border-primary)] space-y-6 shadow-sm">
              <h3 className="text-xs font-bold text-[var(--text-tertiary)] uppercase tracking-wider">Smart Inputs</h3>
              
              <div className="space-y-4">
                {/* 1. Standard Text */}
                <FormField 
                    label="Project Name" 
                    placeholder="Adaptive Engine" 
                    required 
                />

                {/* 2. Select Dropdown */}
                <FormField 
                    label="Environment" 
                    type="select" 
                    options={['Development', 'Staging', 'Production']} 
                />

                <div className="grid grid-cols-2 gap-4">
                    {/* 3. Currency (Auto-formats right align with $) */}
                    <FormField 
                        label="Budget" 
                        type="currency" 
                        placeholder="0.00" 
                    />
                    
                    {/* 4. Percentage (Auto-formats right align with %) */}
                    <FormField 
                        label="Allocation" 
                        type="percent" 
                        placeholder="0" 
                    />
                </div>

                {/* 5. Error State */}
                <FormField 
                    label="Description" 
                    type="textarea" 
                    placeholder="Enter details..." 
                    error="This field is required for public projects"
                />
              </div>
            </div>

            {/* CARDS */}
            <div className="p-6 bg-[var(--surface-secondary)] rounded-lg border border-[var(--border-primary)] space-y-6 shadow-sm">
              <h3 className="text-xs font-bold text-[var(--text-tertiary)] uppercase tracking-wider">Data Display</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <StatCard title="Total Users" value="2,543" trend="+12.5%" />
                    <StatCard title="Active Sessions" value="142" trend="+3.2%" />
                </div>
                <div className="border border-dashed border-[var(--border-secondary)] rounded p-1">
                   <EmptyState
                      title="No Results"
                      message="There are no items matching your current filters."
                      action={<Button action="primary" text="Clear Filters" />}
                   />
                </div>
              </div>
            </div>

            {/* SKELETON TEST AREA */}
            <div className="p-6 bg-[var(--surface-secondary)] rounded-lg border border-[var(--border-primary)] space-y-6 shadow-sm">
                <h3 className="text-xs font-bold text-[var(--text-tertiary)] uppercase tracking-wider">Loading States</h3>
                
                {/* 1. Profile Card Skeleton */}
                <div className="flex items-center gap-4 p-4 border border-[var(--border-secondary)] rounded-lg">
                    {/* Avatar Skeleton */}
                    <Skeleton variant="circle" width={48} height={48} />
                    
                    <div className="flex-1 space-y-2">
                        {/* Title Skeleton */}
                        <Skeleton variant="text" width="60%" />
                        {/* Subtitle Skeleton */}
                        <Skeleton variant="text" width="40%" className="h-3" />
                    </div>
                </div>

                {/* 2. Data Table Skeleton */}
                <div className="space-y-3">
                    <Skeleton variant="rect" height={32} className="w-full" />
                    <Skeleton variant="rect" height={32} className="w-full opacity-75" />
                    <Skeleton variant="rect" height={32} className="w-full opacity-50" />
                </div>
            </div>
            {/* MODERN AREA */}
            <div className="col-span-full p-6 bg-[var(--surface-secondary)] rounded-lg border border-[var(--border-primary)] space-y-6 shadow-sm">
              <h3 className="text-xs font-bold text-[var(--text-tertiary)] uppercase tracking-wider">Modern Selection</h3>
              
              <RadioCardGroup 
                label="Server RAM Allocation"
                options={['8 GB', '16 GB', '32 GB', '64 GB', '128 GB', '256 GB']}
                disabledOptions={['256 GB']}
                initialSelected="32 GB"
                onChange={(val) => console.log('Selected:', val)}
              />
            </div>
            {/* MODERN NOTIFICATIONS */}
            <div className="col-span-full xl:col-span-1 p-6 bg-[var(--surface-secondary)] rounded-lg border border-[var(--border-primary)] space-y-6 shadow-sm">
              <h3 className="text-xs font-bold text-[var(--text-tertiary)] uppercase tracking-wider">Modern Toasts</h3>
              
              <div className="flex flex-col gap-4">
                {/* Standard User Message Toast */}
                <NotificationToast 
                  title="Emilia Gates"
                  message="Sure! 8:30pm works great!"
                  actionLabel="Reply"
                  avatarSrc="https://i.pravatar.cc/150?u=12"
                  onAction={() => console.log('Reply clicked')}
                  onDismiss={() => console.log('Dismissed')}
                />

                {/* System Alert Toast (Using Avatar fallback for initials) */}
                <NotificationToast 
                  title="System Update"
                  message="Database synchronization complete."
                  actionLabel="View"
                  onAction={() => console.log('View clicked')}
                  onDismiss={() => console.log('Dismissed')}
                />
              </div>
            </div>
            {/* MODERN ALERTS */}
            <div className="col-span-full xl:col-span-1 p-6 bg-[var(--surface-secondary)] rounded-lg border border-[var(--border-primary)] space-y-6 shadow-sm">
              <h3 className="text-xs font-bold text-[var(--text-tertiary)] uppercase tracking-wider">Alerts & Banners</h3>
              
              <div className="flex flex-col gap-4">
                {/* Warning Variant */}
                <ModernAlert 
                  title="Attention needed"
                  message="Your API rate limit is currently at 95% capacity for this billing cycle."
                  type="warning"
                />
                
                {/* Success Variant */}
                <ModernAlert 
                  title="System Update Complete"
                  message="All database records have been successfully synchronized across the cluster."
                  type="success"
                />

                {/* Error Variant (Title Only) */}
                <ModernAlert 
                  title="Connection failed. Please check your network."
                  message={null}
                  type="error"
                />
              </div>
            </div>

            {/* MODAL TRIGGER */}
            <div className="col-span-full p-6 bg-[var(--surface-secondary)] rounded-lg border border-[var(--border-primary)] flex items-center justify-between shadow-sm">
                <div>
                <h3 className="text-xs font-bold text-[var(--text-tertiary)] uppercase tracking-wider">Overlays</h3>
                <p className="text-sm text-[var(--text-secondary)] mt-1">Test modal layering, backdrop blur, and theme inheritance.</p>
                </div>
                <Button action="primary" text="Launch Modal" onClick={() => setIsModalOpen(true)} />
                
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Theme Compatibility Test">
                <div className="text-[var(--text-primary)] space-y-4">
                    <p className="text-sm leading-relaxed">
                        This modal is rendered via a Portal (simulated) but should still inherit the global CSS variables from the root.
                    </p>
                    <div className="p-4 bg-[var(--surface-secondary)] rounded border border-[var(--border-secondary)]">
                        <code className="text-xs font-mono text-[var(--accent-primary)]">
                            Current Theme: {previewTheme}<br/>
                            Current Font: {currentFont}
                        </code>
                    </div>
                    <div className="flex justify-end pt-4 border-t border-[var(--border-secondary)]">
                        <Button action="save" text="Done" onClick={() => setIsModalOpen(false)} />
                    </div>
                </div>
                </Modal>
            </div>

          </div>
      </div>
    </MainLayout>
  );
};

ReactDOM.render(<Workbench />, document.getElementById('root'));