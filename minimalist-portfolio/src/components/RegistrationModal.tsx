import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface RegistrationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [telegram, setTelegram] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const { error: supabaseError } = await supabase
                .from('project_leads')
                .insert([{ email, telegram }]);

            if (supabaseError) throw supabaseError;

            setIsSuccess(true);
            setTimeout(() => {
                onClose();
                setIsSuccess(false);
                setEmail('');
                setTelegram('');
            }, 2000);
        } catch (err) {
            console.error(err);
            setError('Что-то пошло не так. Попробуйте еще раз.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed inset-0 flex items-center justify-center z-[101] pointer-events-none p-4"
                    >
                        <div className="bg-white rounded-[2rem] p-8 md:p-12 w-full max-w-lg shadow-2xl pointer-events-auto relative overflow-hidden">
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500"
                            >
                                <X size={24} />
                            </button>

                            {isSuccess ? (
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                                        <Check size={32} />
                                    </div>
                                    <h3 className="text-2xl font-heading font-medium mb-2">Отлично!</h3>
                                    <p className="text-text-secondary">Мы свяжемся с тобой, когда всё будет готово.</p>
                                </div>
                            ) : (
                                <>
                                    <h2 className="text-3xl md:text-4xl font-heading font-medium mb-4 leading-tight">
                                        Оставь контакты, в конце года планирую <span className="text-brand-accent">интересный проект)</span>
                                    </h2>
                                    <p className="text-text-secondary mb-8 text-lg">
                                        Не спамлю. Просто напишу один раз.
                                    </p>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-text-secondary mb-1.5 ml-1">Email</label>
                                            <input
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="hello@example.com"
                                                className="w-full px-6 py-4 rounded-xl bg-gray-50 border-2 border-transparent focus:border-brand-accent/20 focus:bg-white focus:outline-none transition-all text-lg"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-text-secondary mb-1.5 ml-1">Telegram</label>
                                            <input
                                                type="text"
                                                required
                                                value={telegram}
                                                onChange={(e) => setTelegram(e.target.value)}
                                                placeholder="@username"
                                                className="w-full px-6 py-4 rounded-xl bg-gray-50 border-2 border-transparent focus:border-brand-accent/20 focus:bg-white focus:outline-none transition-all text-lg"
                                            />
                                        </div>

                                        {error && (
                                            <p className="text-red-500 text-sm ml-1">{error}</p>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full mt-4 bg-brand text-white font-medium text-lg py-4 rounded-full hover:bg-brand-accent transition-all shadow-lg hover:shadow-brand-accent/25 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 size={20} className="animate-spin" />
                                                    Отправка...
                                                </>
                                            ) : (
                                                'Вступить'
                                            )}
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
