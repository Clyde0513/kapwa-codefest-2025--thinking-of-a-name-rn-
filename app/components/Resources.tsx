'use client';

export default function Resources() {
  const resources = [
    {
      id: 1,
      title: 'The Vatican: The Holy See',
      url: 'https://www.vatican.va/',
    },
    {
      id: 2,
      title: 'Archdiocese of Boston',
      url: 'https://www.bostoncatholic.org/',
    },
    {
      id: 3,
      title: 'Daily Readings',
      url: 'https://bible.usccb.org/daily-bible-reading',
    },
    {
      id: 4,
      title: 'Cardinal Sean\'s Blog',
      url: 'https://www.cardinalseansblog.org/',
    },
    {
      id: 5,
      title: 'The Good Catholic Life',
      url: 'https://www.thegoodcatholiclife.com/',
    },
    {
      id: 6,
      title: 'Catholic Devotions',
      url: 'https://www.catholicdevotions.org/',
    },
  ];

  return (
    <section id="resources" className="py-20 px-4" style={{ backgroundColor: '#FFFDD0' }}>
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-poppins font-bold text-gray-900 text-center mb-16">
          Resources for<br />Spiritual Growth
        </h2>
        
        {/* Resources List */}
        <div className="space-y-6">
          {resources.map((resource) => (
            <a
              key={resource.id}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center text-2xl md:text-3xl font-serif text-gray-900 hover:text-red-700 transition-colors duration-200 py-3"
            >
              {resource.title}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
