export default function Alert({ type = 'success', message, onClose }) {
    const styles = {
        success: 'bg-green-50 border-green-500 text-green-800',
        error: 'bg-red-50 border-red-500 text-red-800',
        info: 'bg-blue-50 border-blue-500 text-blue-800',
        warning: 'bg-yellow-50 border-yellow-500 text-yellow-800',
    };

    const icons = {
        success: '✓',
        error: '✕',
        info: 'ℹ',
        warning: '⚠',
    };

    if (!message) {
        return null;
    }

    const variant = styles[type] ? type : 'info';

    return (
        <div
            role="alert"
            className={`${styles[variant]} border-l-4 p-4 rounded-r mb-6 flex items-start justify-between gap-3 animate-fade-in`}
        >
            <div className="flex items-start gap-3 flex-1">
                <span className="text-2xl font-bold leading-none">{icons[variant]}</span>
                <p className="font-['Lora'] text-sm leading-relaxed break-words">{message}</p>
            </div>
            {onClose && (
                <button
                    type="button"
                    onClick={onClose}
                    className="text-xl hover:opacity-70 shrink-0"
                    aria-label="Close alert"
                >
                    ×
                </button>
            )}
        </div>
    );
}
