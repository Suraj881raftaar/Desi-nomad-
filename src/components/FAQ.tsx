import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqList: FAQItem[] = [
  {
    id: 1,
    question: 'What should I pack for my trek?',
    answer: 'A comprehensive packing list is available in the preparation checklist tab on each trek detail modal. Essential items include sturdy high-ankle trekking shoes, a 50-60L backpack, moisture-wicking layers, a fleece jacket, a waterproof poncho, two insulated water bottles, and a personal medical kit.'
  },
  {
    id: 2,
    question: 'Are these treks suitable for beginners?',
    answer: "Yes, we design several routes specifically for beginners! Our treks are graded by difficulty. 'Easy' routes like the Mystic Meadows require basic physical fitness and no prior high-altitude experience. 'Moderate' and 'Demanding' treks require cardiovascular conditioning and leg strength preparation."
  },
  {
    id: 3,
    question: 'How does the booking process work?',
    answer: 'Select your preferred trek, calculate estimated costs with your group size, and fill out the inquiry form. Our team will verify batch openings and email you the payment details. A secure deposit completes your registration. Then, you will receive our preparation guide, fitness checklist, and departure dates.'
  },
  {
    id: 4,
    question: 'What is your Green Trails and community etiquette policy?',
    answer: 'We follow a strict zero-waste code: Pack in, pack out. Trekkers are given eco-bags to carry dry waste down the mountain. We respect local village customs by lodging at local family homestays, requesting respectful noise levels, and ensuring that photography of local communities is done only with their polite consent.'
  }
];

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faqs" className="section faq-section">
      <div className="section-title">
        <h2>Frequently Asked Questions</h2>
        <p>Everything you need to know before stepping onto the mountain trails.</p>
      </div>

      <div className="faq-container">
        {faqList.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div key={item.id} className={`faq-card card ${isOpen ? 'open' : ''}`}>
              <button 
                className="faq-question" 
                onClick={() => toggleFAQ(item.id)}
                aria-expanded={isOpen}
              >
                <div className="faq-title-wrap">
                  <HelpCircle className="faq-icon" size={20} />
                  <span>{item.question}</span>
                </div>
                {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              
              <div className={`faq-answer ${isOpen ? 'show' : ''}`}>
                <p>{item.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
