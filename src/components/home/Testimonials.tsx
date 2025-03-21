import React from 'react';
import { motion } from 'framer-motion';
import Container from '../ui/Container';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  image: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ quote, author, role, company, image }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
      <div className="flex items-center mb-6">
        <svg className="h-12 w-12 text-blue-500 mr-4" fill="currentColor" viewBox="0 0 32 32">
          <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
        </svg>
        <div>
          <img 
            src={image} 
            alt={author} 
            className="w-12 h-12 rounded-full object-cover border-2 border-blue-100"
          />
        </div>
      </div>
      <blockquote className="text-lg text-gray-700 mb-6">{quote}</blockquote>
      <div>
        <div className="font-medium text-gray-900">{author}</div>
        <div className="text-gray-600 text-sm">{role}, {company}</div>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "Creator Labs has transformed how we build software. What used to take months now takes days, and the quality is consistently high.",
      author: "Sarah Johnson",
      role: "CTO",
      company: "Acme Inc",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
    },
    {
      quote: "The multi-agent approach is revolutionary. It's like having an entire development team at your fingertips, available 24/7.",
      author: "Michael Chen",
      role: "VP of Engineering",
      company: "Globex",
      image: "https://randomuser.me/api/portraits/men/46.jpg",
    },
    {
      quote: "We've reduced our development costs by 60% while increasing our output. Creator Labs has been a game-changer for our business.",
      author: "Emily Rodriguez",
      role: "Product Director",
      company: "Soylent Corp",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <Container>
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600">
            Don't just take our word for it. See how Creator Labs is helping organizations transform their development process.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Testimonial {...testimonial} />
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="inline-flex items-center justify-center px-6 py-3 bg-blue-50 rounded-full">
            <span className="text-blue-600 font-medium mr-2">Customer satisfaction</span>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-blue-600 font-medium ml-2">4.9/5</span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Testimonials;
