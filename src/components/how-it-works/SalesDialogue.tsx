import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Container from '../ui/Container';
import Button from '../ui/Button';

interface DialogueMessage {
  id: number;
  speaker: 'CIO' | 'CL';
  message: string;
  options?: string[];
}

const initialMessages: DialogueMessage[] = [
  {
    id: 1,
    speaker: 'CIO',
    message: 'Our organization needs a solution that can streamline application development without overwhelming our teams. How does your platform address this?'
  },
  {
    id: 2,
    speaker: 'CL',
    message: 'Great question. Our platform leverages an AI-driven multi-agent system that simplifies the entire development lifecycle. Imagine a team of specialized agents working in harmony: one for gathering requirements, another for planning, and more, all the way through deployment.'
  },
  {
    id: 3,
    speaker: 'CIO',
    message: 'That sounds intriguing, but how do we manage different departments and roles without complexity?'
  }
];

const remainingMessages: DialogueMessage[] = [
  {
    id: 4,
    speaker: 'CL',
    message: "We've thought of that. Our platform includes customizable 'spaces' for departments, facilities, or teams, making it easy to manage them individually. Plus, we have role affinity mapping to streamline permissions across applications."
  },
  {
    id: 5,
    speaker: 'CIO',
    message: 'Can you walk me through the process of building an application with your platform?',
    options: [
      'Show a detailed walkthrough',
      'Provide a high-level overview',
      'Share a customer success story'
    ]
  },
  {
    id: 6,
    speaker: 'CL',
    message: "Absolutely! Here's how it works:\n\n1. First, you describe your application idea in a paragraph.\n2. Our AI asks clarifying questions to understand your requirements fully.\n3. We generate a detailed blueprint and state machine that maps out your application's architecture.\n4. The blueprint is broken down into a product backlog with user stories that you can review and refine.\n5. Our platform builds the backend and frontend, testing them thoroughly.\n6. Finally, you can deploy the application to your organizational spaces with just a few clicks."
  },
  {
    id: 7,
    speaker: 'CIO',
    message: "That's impressive. How easy is it to get started and onboard our team?"
  },
  {
    id: 8,
    speaker: 'CL',
    message: "Very easy. We offer a user-friendly setup process with step-by-step guidance and 24/7 support to ensure a smooth transition. We also provide comprehensive training for your team to help them get the most out of the platform."
  },
  {
    id: 9,
    speaker: 'CIO',
    message: 'That sounds like a comprehensive solution. How can we start?',
    options: [
      'Schedule a demo',
      'Start a free trial',
      'Talk to a sales representative'
    ]
  }
];

const SalesDialogue: React.FC = () => {
  const [messages, setMessages] = useState<DialogueMessage[]>(initialMessages);
  const [currentOption, setCurrentOption] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [typingMessageId, setTypingMessageId] = useState<number | null>(null);
  const [autoplayPaused, setAutoplayPaused] = useState(false);

  useEffect(() => {
    if (!autoplayPaused && messages.length < initialMessages.length + remainingMessages.length) {
      const timer = setTimeout(() => {
        const nextMessage = remainingMessages[messages.length - initialMessages.length];
        if (nextMessage) {
          addMessage(nextMessage);
        }
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [messages, autoplayPaused]);

  const addMessage = (message: DialogueMessage) => {
    setTypingMessageId(message.id);
    setIsTyping(true);
    
    // Simulate typing effect
    let fullMessage = '';
    const messageText = message.message;
    let i = 0;
    
    const typingInterval = setInterval(() => {
      if (i < messageText.length) {
        fullMessage += messageText.charAt(i);
        setMessages(prev => {
          const updatedMessages = [...prev];
          const messageIndex = updatedMessages.findIndex(m => m.id === message.id);
          
          if (messageIndex >= 0) {
            updatedMessages[messageIndex] = {
              ...updatedMessages[messageIndex],
              message: fullMessage
            };
          } else {
            updatedMessages.push({
              ...message,
              message: fullMessage
            });
          }
          
          return updatedMessages;
        });
        i++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
        setTypingMessageId(null);
        
        // If this message has options, pause autoplay
        if (message.options) {
          setAutoplayPaused(true);
        }
      }
    }, 20);
  };

  const handleOptionClick = (option: string) => {
    setCurrentOption(option);
    setAutoplayPaused(false);
    
    // Continue with next message
    const nextMessage = remainingMessages[messages.length - initialMessages.length];
    if (nextMessage) {
      addMessage(nextMessage);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <Container>
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              See Creator Labs in Action
            </h2>
            <p className="text-xl text-gray-600">
              A conversation between a CIO and our product specialist
            </p>
          </motion.div>
          
          <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
              <div className="flex items-center">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-white font-medium ml-4">Sales Conversation Demo</div>
              </div>
            </div>
            
            <div className="p-6 max-h-[600px] overflow-y-auto">
              <div className="space-y-6">
                {messages.map((message) => (
                  <motion.div 
                    key={message.id}
                    className={`flex ${message.speaker === 'CIO' ? '' : 'justify-end'}`}
                    initial={{ opacity: 0, x: message.speaker === 'CIO' ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {message.speaker === 'CIO' && (
                      <div className="flex-shrink-0 mr-4">
                        <div className="w-12 h-12 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center text-gray-700 font-semibold">
                          CIO
                        </div>
                      </div>
                    )}
                    
                    <div className={`rounded-2xl p-5 shadow-sm max-w-[80%] ${
                      message.speaker === 'CIO' 
                        ? 'bg-white border border-gray-200 rounded-tl-none' 
                        : 'bg-blue-600 text-white rounded-tr-none'
                    }`}>
                      <div className={message.speaker === 'CIO' ? 'text-gray-800' : 'text-white'}>
                        {message.message.split('\n').map((text, i) => (
                          <React.Fragment key={i}>
                            {text}
                            {i < message.message.split('\n').length - 1 && <br />}
                          </React.Fragment>
                        ))}
                        {isTyping && typingMessageId === message.id && (
                          <span className="inline-flex space-x-1 ml-1">
                            <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                            <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                            <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                          </span>
                        )}
                      </div>
                      
                      {message.options && !isTyping && autoplayPaused && (
                        <div className="mt-4 space-y-2">
                          {message.options.map((option, index) => (
                            <Button
                              key={index}
                              onClick={() => handleOptionClick(option)}
                              variant={message.speaker === 'CIO' ? 'primary' : 'secondary'}
                              size="sm"
                              className="mr-2 mb-2"
                            >
                              {option}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {message.speaker === 'CL' && (
                      <div className="flex-shrink-0 ml-4">
                        <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                          CL
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
                
                {messages.length === initialMessages.length + remainingMessages.length && (
                  <div className="flex justify-center mt-8">
                    <Button href="/demo" variant="primary" size="lg">
                      Schedule Your Demo
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default SalesDialogue;
