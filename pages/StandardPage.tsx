
import React from 'react';
import { PageType } from '../types';

interface StandardPageProps {
  type: PageType;
}

const StandardPage: React.FC<StandardPageProps> = ({ type }) => {
  const getContent = () => {
    switch(type) {
      case PageType.ABOUT:
        return {
          title: "About Us",
          content: `
            <p>Welcome to our professional editorial platform. We are dedicated to providing you the very best of technology, lifestyle, and business insights, with an emphasis on reliability, daily updates, and professional integrity.</p>
            <p>Founded in 2024, our blog has come a long way from its beginnings. When we first started out, our passion for high-quality information drove us to start our own professional network.</p>
            <p>We hope you enjoy our articles as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.</p>
          `
        };
      case PageType.CONTACT:
        return {
          title: "Contact Us",
          content: `
            <p>We would love to hear from you! Whether you have a question about our content, suggestions for new topics, or just want to say hi, our team is ready to listen.</p>
            <p><strong>Email:</strong> contact@blogger-cms-professional.com</p>
            <p><strong>Support:</strong> support@blogger-cms-professional.com</p>
            <p>We typically respond to all inquiries within 24-48 business hours.</p>
          `
        };
      case PageType.PRIVACY:
        return {
          title: "Privacy Policy",
          content: `
            <p>This Privacy Policy describes how your personal information is collected, used, and shared when you visit our blog.</p>
            <h2>Personal Information We Collect</h2>
            <p>When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device.</p>
            <h2>Advertising</h2>
            <p>We use Google AdSense to serve ads on our site. Google uses cookies to serve ads based on a user's prior visits to your website or other websites.</p>
          `
        };
      case PageType.DISCLAIMER:
        return {
          title: "Disclaimer",
          content: `
            <p>The information provided by our blog is for general informational purposes only. All information on the Site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.</p>
            <p>UNDER NO CIRCUMSTANCE SHALL WE HAVE ANY LIABILITY TO YOU FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF THE SITE OR RELIANCE ON ANY INFORMATION PROVIDED ON THE SITE.</p>
          `
        };
      case PageType.TERMS:
        return {
          title: "Terms & Conditions",
          content: `
            <p>By accessing this blog, you are agreeing to be bound by these website Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
            <h2>Use License</h2>
            <p>Permission is granted to temporarily download one copy of the materials (information or software) on our website for personal, non-commercial transitory viewing only.</p>
          `
        };
      default:
        return { title: "Page Not Found", content: "The requested page could not be located." };
    }
  };

  const data = getContent();

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 border-b pb-4">{data.title}</h1>
      <div 
        className="prose prose-lg prose-blue max-w-none text-gray-700 leading-relaxed space-y-6"
        dangerouslySetInnerHTML={{ __html: data.content }}
      />
    </div>
  );
};

export default StandardPage;
