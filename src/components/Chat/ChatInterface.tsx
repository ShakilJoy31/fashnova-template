"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiX, FiMinimize, FiMaximize, FiPaperclip, FiImage, FiFile } from "react-icons/fi";
import { FaUserCircle, FaRobot } from "react-icons/fa";
import { useChat } from "@/hooks/ChatContext";
import Button from "../reusable-components/Button";

interface Message {
    id: number;
    text: string;
    sender: "user" | "bot";
    timestamp: Date;
    file?: {
        name: string;
        type: string;
        url: string;
        size: string;
    };
}

export default function ChatInterface() {
    const { isChatOpen, setIsChatOpen } = useChat();
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "Hello! Welcome to Gramer Hat Organic Food. How can I help you today?",
            sender: "bot",
            timestamp: new Date(),
        },
    ]);
    const [inputMessage, setInputMessage] = useState("");
    const [isMinimized, setIsMinimized] = useState(false);
    const [showFileOptions, setShowFileOptions] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputMessage.trim() === "") return;

        // Add user message
        const userMessage: Message = {
            id: messages.length + 1,
            text: inputMessage,
            sender: "user",
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputMessage("");

        // Simulate bot response after a delay
        setTimeout(() => {
            const botResponse: Message = {
                id: messages.length + 2,
                text: "Thank you for your message. Our support team will get back to you shortly. In the meantime, is there anything specific you'd like to know about our organic products?",
                sender: "bot",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botResponse]);
        }, 1000);
    };

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Check file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert("File size too large. Please select a file smaller than 5MB.");
            return;
        }

        // Check file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf', 'text/plain'];
        if (!allowedTypes.includes(file.type)) {
            alert("Please select a valid file type (JPEG, PNG, GIF, WebP, PDF, or TXT).");
            return;
        }

        setIsUploading(true);
        setShowFileOptions(false);

        // Simulate file upload
        setTimeout(() => {
            const fileUrl = URL.createObjectURL(file);
            const fileSize = formatFileSize(file.size);

            const fileMessage: Message = {
                id: messages.length + 1,
                text: `Sent a file: ${file.name}`,
                sender: "user",
                timestamp: new Date(),
                file: {
                    name: file.name,
                    type: file.type,
                    url: fileUrl,
                    size: fileSize,
                },
            };

            setMessages((prev) => [...prev, fileMessage]);
            setIsUploading(false);

            // Simulate bot response for file
            setTimeout(() => {
                const botResponse: Message = {
                    id: messages.length + 2,
                    text: "Thank you for sharing the file. I've received it and will review it with our team.",
                    sender: "bot",
                    timestamp: new Date(),
                };
                setMessages((prev) => [...prev, botResponse]);
            }, 1500);
        }, 2000);

        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const getFileIcon = (fileType: string) => {
        if (fileType.startsWith('image/')) return <FiImage className="text-blue-500" />;
        if (fileType === 'application/pdf') return <FiFile className="text-red-500" />;
        return <FiFile className="text-gray-500" />;
    };

    const handleFileButtonClick = () => {
        setShowFileOptions(!showFileOptions);
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const renderFileMessage = (message: Message) => {
        if (!message.file) return null;

        return (
            <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-3">
                    {getFileIcon(message.file.type)}
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                            {message.file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                            {message.file.size} • {message.file.type.split('/')[1]?.toUpperCase() || 'FILE'}
                        </p>
                    </div>
                    <a
                        href={message.file.url}
                        download={message.file.name}
                        className="text-green-600 hover:text-green-700 text-sm font-medium"
                    >
                        Download
                    </a>
                </div>
                {message.file.type.startsWith('image/') && (
                    <div className="mt-2">
                        <img
                            src={message.file.url}
                            alt={message.file.name}
                            className="max-w-full h-32 object-cover rounded-lg border border-gray-200"
                        />
                    </div>
                )}
            </div>
        );
    };

    if (!isChatOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                className="fixed bottom-4 right-4 z-50 w-96 max-w-[calc(100vw-2rem)]"
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className={`bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col ${isMinimized ? "h-16" : "h-[500px]"
                        } transition-all duration-300`}
                >
                    {/* Chat Header */}
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-t-2xl p-4 text-white">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="relative">
                                    <div className="w-3 h-3 bg-green-300 rounded-full absolute -top-0 -right-0 animate-ping"></div>
                                    <div className="w-3 h-3 bg-green-300 rounded-full absolute -top-0 -right-0"></div>
                                    <FaUserCircle size={35} className="text-2xl" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Live Support</h3>
                                    <p className="text-green-100 text-sm">We&apos;re online</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Button
                                    onClick={() => setIsMinimized(!isMinimized)}
                                    className="p-1 hover:cursor-pointer hover:bg-green-600 rounded-lg transition-colors"
                                >
                                    {isMinimized ? <FiMaximize /> : <FiMinimize />}
                                </Button>
                                <Button
                                    onClick={() => setIsChatOpen(false)}
                                    className="p-1 hover:cursor-pointer hover:text-red-600 rounded-lg transition-colors"
                                >
                                    <FiX />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {!isMinimized && (
                        <>
                            {/* Chat Messages */}
                            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                                <div className="space-y-4">
                                    {messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"
                                                }`}
                                        >
                                            <div
                                                className={`flex flex-col max-w-[80%] ${message.sender === "user"
                                                        ? "bg-green-500 text-white"
                                                        : "bg-white text-gray-800 border border-gray-200"
                                                    } rounded-2xl p-3 shadow-sm`}
                                            >
                                                <div className="flex items-start space-x-2">
                                                    {message.sender === "bot" && (
                                                        <FaRobot size={25} className="text-green-500 mt-1 flex-shrink-0" />
                                                    )}
                                                    <div className="flex-1">
                                                        <p className="text-sm">{message.text}</p>
                                                        {renderFileMessage(message)}
                                                        <p
                                                            className={`text-xs mt-1 ${message.sender === "user"
                                                                    ? "text-green-100"
                                                                    : "text-gray-500"
                                                                }`}
                                                        >
                                                            {formatTime(message.timestamp)}
                                                        </p>
                                                    </div>
                                                    {message.sender === "user" && (
                                                        <FaUserCircle size={25} className="text-green-200 mt-1 flex-shrink-0" />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {isUploading && (
                                        <div className="flex justify-start">
                                            <div className="bg-white border border-gray-200 rounded-2xl p-3 shadow-sm">
                                                <div className="flex items-center space-x-2">
                                                    <FaRobot size={25} className="text-green-500" />
                                                    <div>
                                                        <p className="text-sm text-gray-600">Uploading file...</p>
                                                        <div className="w-32 h-1 bg-gray-200 rounded-full mt-1 overflow-hidden">
                                                            <div className="h-full bg-green-500 rounded-full animate-pulse"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>
                            </div>

                            {/* File Input (Hidden) */}
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileSelect}
                                accept=".jpg,.jpeg,.png,.gif,.webp,.pdf,.txt"
                                className="hidden"
                            />

                            {/* File Options Popover */}
                            <AnimatePresence>
                                {showFileOptions && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                        className="absolute bottom-16 left-4 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-10"
                                    >
                                        <div className="space-y-1">
                                            <Button
                                                onClick={() => fileInputRef.current?.click()}
                                                className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                                            >
                                                <FiImage className="text-blue-500" />
                                                <span>Upload Image</span>
                                            </Button>
                                            <Button
                                                onClick={() => fileInputRef.current?.click()}
                                                className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                                            >
                                                <FiFile className="text-red-500" />
                                                <span>Upload Document</span>
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Chat Input */}
                            <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
                                <form onSubmit={handleSendMessage} className="flex space-x-2">
                                    <div className="relative flex-1">
                                        <input
                                            type="text"
                                            value={inputMessage}
                                            onChange={(e) => setInputMessage(e.target.value)}
                                            placeholder="Type your message..."
                                            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                        <Button
                                            type="button"
                                            onClick={handleFileButtonClick}
                                            className="absolute hover:cursor-pointer right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-500 transition-colors"
                                        >
                                            <FiPaperclip size={18} />
                                        </Button>
                                    </div>
                                    <Button
                                        type="submit"
                                        disabled={inputMessage.trim() === ""}
                                        className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-2 hover:cursor-pointer rounded-full transition-colors duration-200"
                                    >
                                        <FiSend size={25} />
                                    </Button>
                                </form>
                                <p className="text-center text-xs text-gray-500 mt-2">
                                    Supports images and documents (max 5MB)
                                </p>
                            </div>
                        </>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}