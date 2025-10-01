import { generateFAQSchema } from './faq-schema';

describe('generateFAQSchema', () => {
  it('should generate valid FAQPage schema', () => {
    const faqs = [
      {
        question: 'What is RosterLab?',
        answer: 'RosterLab is an AI-powered scheduling software.'
      },
      {
        question: 'How does it work?',
        answer: 'It uses AI to optimize schedules.'
      }
    ];

    const schema = generateFAQSchema(faqs);

    expect(schema).toEqual({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'What is RosterLab?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'RosterLab is an AI-powered scheduling software.'
          }
        },
        {
          '@type': 'Question',
          'name': 'How does it work?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'It uses AI to optimize schedules.'
          }
        }
      ]
    });
  });
});