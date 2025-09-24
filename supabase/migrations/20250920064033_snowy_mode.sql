/*
  # Create blog application schema

  1. New Tables
    - `blog_posts`
      - `id` (uuid, primary key)
      - `title` (text)
      - `slug` (text, unique)
      - `excerpt` (text)
      - `content` (text)
      - `thumbnail_url` (text, optional)
      - `tags` (text array)
      - `status` (enum: draft, published)
      - `author` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `published_at` (timestamp, optional)
      - `read_time` (integer)
      - `views` (integer)
    
    - `subscribers`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `name` (text, optional)
      - `subscribed_at` (timestamp)
      - `status` (enum: active, unsubscribed)
    
    - `content_suggestions`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `subject` (text)
      - `message` (text)
      - `status` (enum: pending, reviewed, implemented)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access to published blog posts
    - Add policies for newsletter subscriptions
    - Add policies for content suggestions
*/

-- Create custom types
CREATE TYPE post_status AS ENUM ('draft', 'published');
CREATE TYPE subscriber_status AS ENUM ('active', 'unsubscribed');
CREATE TYPE suggestion_status AS ENUM ('pending', 'reviewed', 'implemented');

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  thumbnail_url text,
  tags text[] DEFAULT '{}',
  status post_status DEFAULT 'draft',
  author text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  published_at timestamptz,
  read_time integer DEFAULT 5,
  views integer DEFAULT 0
);

-- Create subscribers table
CREATE TABLE IF NOT EXISTS subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text,
  subscribed_at timestamptz DEFAULT now(),
  status subscriber_status DEFAULT 'active'
);

-- Create content_suggestions table
CREATE TABLE IF NOT EXISTS content_suggestions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  status suggestion_status DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_suggestions ENABLE ROW LEVEL SECURITY;

-- Create policies for blog_posts
CREATE POLICY "Anyone can read published blog posts"
  ON blog_posts
  FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

CREATE POLICY "Authenticated users can read all blog posts"
  ON blog_posts
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policies for subscribers
CREATE POLICY "Anyone can insert subscribers"
  ON subscribers
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can read their own subscription"
  ON subscribers
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = email);

-- Create policies for content_suggestions
CREATE POLICY "Anyone can insert content suggestions"
  ON content_suggestions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read content suggestions"
  ON content_suggestions
  FOR SELECT
  TO authenticated
  USING (true);

create or replace function handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.subscribers (email, name, status)
  values (
    new.email,
    new.raw_user_meta_data->>'name', -- optional: only works if you pass name in signUp metadata
    'active'::subscriber_status
  )
  on conflict (email) do nothing; -- avoid duplicates if they already exist
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute function handle_new_user();


-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);
CREATE INDEX IF NOT EXISTS idx_subscribers_status ON subscribers(status);

-- Insert some sample blog posts
INSERT INTO blog_posts (title, slug, excerpt, content, author, status, published_at, tags, read_time) VALUES
(
  'Getting Started with Cryptocurrency: A Beginner''s Guide',
  'getting-started-cryptocurrency-beginners-guide',
  'Learn the fundamentals of cryptocurrency, blockchain technology, and how to make your first investment safely.',
  '# Getting Started with Cryptocurrency: A Beginner''s Guide

Cryptocurrency has revolutionized the financial world, but for beginners, it can seem overwhelming. This comprehensive guide will walk you through everything you need to know to start your crypto journey safely and confidently.

## What is Cryptocurrency?

Cryptocurrency is a digital or virtual currency that uses cryptography for security. Unlike traditional currencies issued by governments, cryptocurrencies operate on decentralized networks based on blockchain technology.

## Key Concepts to Understand

### Blockchain Technology
The blockchain is a distributed ledger that records all transactions across a network of computers. This technology ensures transparency, security, and immutability of transaction records.

### Digital Wallets
A cryptocurrency wallet is a digital tool that allows you to store, send, and receive cryptocurrencies. There are several types:
- **Hot wallets**: Connected to the internet (convenient but less secure)
- **Cold wallets**: Offline storage (more secure but less convenient)

## Getting Started: Your First Steps

1. **Educate Yourself**: Before investing, understand the basics of blockchain technology and different cryptocurrencies.

2. **Choose a Reputable Exchange**: Research and select a well-established cryptocurrency exchange with good security measures.

3. **Start Small**: Begin with a small investment that you can afford to lose.

4. **Secure Your Investments**: Use strong passwords, enable two-factor authentication, and consider cold storage for larger amounts.

## Popular Cryptocurrencies for Beginners

- **Bitcoin (BTC)**: The first and most well-known cryptocurrency
- **Ethereum (ETH)**: Platform for smart contracts and decentralized applications
- **Litecoin (LTC)**: Often called "digital silver" to Bitcoin''s "digital gold"

## Risk Management

Cryptocurrency investing comes with significant risks:
- **Volatility**: Prices can fluctuate dramatically
- **Regulatory changes**: Government policies can impact prices
- **Security risks**: Exchanges and wallets can be hacked

## Conclusion

Cryptocurrency offers exciting opportunities, but it''s essential to approach it with knowledge and caution. Start with education, invest only what you can afford to lose, and always prioritize security.

Remember: This is not financial advice. Always do your own research and consider consulting with financial professionals before making investment decisions.',
  'Capryos Team',
  'published',
  now() - interval '2 days',
  ARRAY['cryptocurrency', 'blockchain', 'investing', 'beginners'],
  8
),
(
  'Building a Successful Startup: Lessons from the Trenches',
  'building-successful-startup-lessons-trenches',
  'Real-world insights and practical advice for entrepreneurs looking to build and scale their startups effectively.',
  '# Building a Successful Startup: Lessons from the Trenches

Starting a business is one of the most challenging yet rewarding journeys an entrepreneur can embark on. After working with dozens of startups and building several companies myself, I''ve learned valuable lessons that can help you avoid common pitfalls and increase your chances of success.

## The Foundation: Problem-Solution Fit

Before you write a single line of code or create your first prototype, you need to ensure you''re solving a real problem that people are willing to pay for.

### Validate Early and Often
- Talk to potential customers before building anything
- Create simple prototypes or mockups to test your assumptions
- Use surveys, interviews, and landing pages to gauge interest

## Building Your MVP

Your Minimum Viable Product (MVP) should be the simplest version of your product that can still provide value to customers.

### Key Principles:
1. **Focus on core functionality**: Don''t get distracted by nice-to-have features
2. **Launch quickly**: Get your product in front of users as soon as possible
3. **Iterate based on feedback**: Use customer input to guide your development

## The Importance of Team

Your team can make or break your startup. Here''s what I''ve learned about building great teams:

### Hiring the Right People
- Look for people who share your vision and values
- Prioritize attitude and learning ability over specific skills
- Ensure cultural fit alongside technical competence

### Creating a Strong Culture
- Define your values early and live by them
- Encourage open communication and feedback
- Celebrate wins and learn from failures together

## Funding Your Startup

Not every startup needs venture capital. Consider your options:

### Bootstrap vs. External Funding
- **Bootstrapping**: Maintain control but limit growth speed
- **Angel investors**: Get mentorship along with capital
- **Venture capital**: Access larger amounts but give up equity and control

## Marketing and Customer Acquisition

Building a great product is only half the battle. You need to get it in front of the right people.

### Effective Strategies:
1. **Content marketing**: Share valuable insights to build trust
2. **Social media**: Engage with your community where they spend time
3. **Partnerships**: Collaborate with complementary businesses
4. **Referral programs**: Turn satisfied customers into advocates

## Common Mistakes to Avoid

1. **Building in isolation**: Stay connected with your customers
2. **Perfectionism**: Don''t wait for the perfect product to launch
3. **Ignoring metrics**: Track what matters and make data-driven decisions
4. **Scaling too early**: Ensure product-market fit before aggressive scaling

## The Long Game

Building a successful startup is a marathon, not a sprint. Focus on:
- **Sustainable growth**: Build systems that can scale
- **Customer retention**: It''s cheaper to keep customers than acquire new ones
- **Continuous learning**: Stay curious and adapt to market changes

## Conclusion

Entrepreneurship is challenging, but with the right approach, mindset, and execution, you can build something meaningful and profitable. Remember that every successful entrepreneur has faced setbacks and failures – what matters is how you learn from them and keep moving forward.

The key is to start, learn, iterate, and never give up on your vision.',
  'Capryos Team',
  'published',
  now() - interval '5 days',
  ARRAY['startup', 'entrepreneurship', 'business', 'growth'],
  12
),
(
  'DeFi Explained: The Future of Finance',
  'defi-explained-future-finance',
  'Discover how Decentralized Finance is revolutionizing traditional banking and creating new opportunities for investors.',
  '# DeFi Explained: The Future of Finance

Decentralized Finance, or DeFi, represents one of the most significant innovations in the financial sector since the invention of banking itself. By leveraging blockchain technology, DeFi is creating an open, permissionless financial system that operates without traditional intermediaries.

## What is DeFi?

DeFi refers to a collection of financial services and applications built on blockchain networks, primarily Ethereum. These services aim to recreate traditional financial instruments in a decentralized architecture, outside the control of companies and governments.

## Key Components of DeFi

### Smart Contracts
Smart contracts are self-executing contracts with terms directly written into code. They automatically execute transactions when predetermined conditions are met, eliminating the need for intermediaries.

### Decentralized Exchanges (DEXs)
DEXs allow users to trade cryptocurrencies directly with each other without relying on centralized exchanges. Popular examples include:
- Uniswap
- SushiSwap
- PancakeSwap

### Lending and Borrowing Protocols
DeFi lending platforms allow users to:
- Lend their crypto assets to earn interest
- Borrow against their crypto holdings
- Access liquidity without selling their assets

Popular platforms include Aave, Compound, and MakerDAO.

## Advantages of DeFi

### Accessibility
DeFi services are available to anyone with an internet connection and a cryptocurrency wallet. There are no geographic restrictions or lengthy approval processes.

### Transparency
All transactions and smart contract code are publicly visible on the blockchain, providing unprecedented transparency in financial operations.

### Composability
DeFi protocols can be combined like building blocks, creating complex financial products and services. This "money legos" concept enables rapid innovation.

### Lower Costs
By eliminating intermediaries, DeFi can significantly reduce transaction costs and fees associated with traditional financial services.

## Risks and Challenges

### Smart Contract Risk
Bugs in smart contract code can lead to significant losses. Several high-profile hacks have resulted in millions of dollars being stolen.

### Regulatory Uncertainty
The regulatory landscape for DeFi is still evolving, and future regulations could impact the growth and adoption of these services.

### Scalability Issues
Current blockchain networks face scalability challenges, leading to high transaction fees and slow processing times during peak usage.

### User Experience
DeFi applications can be complex and intimidating for non-technical users, limiting mainstream adoption.

## Popular DeFi Use Cases

### Yield Farming
Users can earn rewards by providing liquidity to DeFi protocols. This involves depositing tokens into liquidity pools and earning fees and governance tokens.

### Staking
Proof-of-stake networks allow users to earn rewards by staking their tokens to help secure the network.

### Synthetic Assets
Platforms like Synthetix allow users to create and trade synthetic versions of real-world assets, from stocks to commodities.

## The Future of DeFi

### Layer 2 Solutions
Technologies like Polygon, Arbitrum, and Optimism are addressing scalability issues by processing transactions off the main Ethereum chain.

### Cross-Chain Interoperability
Projects are working to connect different blockchain networks, allowing DeFi services to operate across multiple chains.

### Institutional Adoption
Traditional financial institutions are beginning to explore DeFi, potentially bringing billions of dollars in liquidity to the space.

## Getting Started with DeFi

1. **Set up a wallet**: Use MetaMask or another Web3 wallet
2. **Start small**: Begin with small amounts to learn how the protocols work
3. **Do your research**: Understand the risks before investing
4. **Stay informed**: Follow reputable DeFi news sources and communities

## Conclusion

DeFi represents a paradigm shift in how we think about finance. While still in its early stages, it has the potential to create a more open, accessible, and efficient financial system. However, it''s important to understand the risks and start with small investments as you learn.

As the technology matures and user experience improves, DeFi could become a significant part of the global financial infrastructure, offering new opportunities for both individual users and institutions.',
  'Capryos Team',
  'published',
  now() - interval '1 day',
  ARRAY['defi', 'cryptocurrency', 'blockchain', 'finance'],
  10
);
insert into blog_posts (
  title,
  slug,
  excerpt,
  content,
  author,
  status,
  created_at,
  tags,
  views
) values (
  'AI in 2025: How Artificial Intelligence is Reshaping Our World',
  'ai-2025-reshaping-world',
  'Explore the key trends in Artificial Intelligence for 2025 and how they are transforming industries, jobs, and everyday life.',
  '# AI in 2025: How Artificial Intelligence is Reshaping Our World

Artificial Intelligence (AI) has evolved from futuristic speculation into a central part of modern life. In 2025, AI continues to push boundaries across healthcare, finance, education, and even creative industries.  

## Key Trends in AI

### 1. Generative AI Everywhere
Tools like ChatGPT, MidJourney, and Stable Diffusion have shown the world what is possible with generative AI. In 2025, these models are powering business productivity, content creation, and even software development.

### 2. AI in Healthcare
AI is helping doctors diagnose diseases faster, create personalized treatment plans, and accelerate drug discovery. Robotics combined with AI are even assisting in surgeries.

### 3. Automation in the Workplace
Routine jobs are increasingly automated, freeing humans for higher-level problem-solving while raising important questions about job displacement.

### 4. AI Governance and Ethics
With great power comes great responsibility. Governments and institutions are developing frameworks to regulate AI usage, focusing on fairness, transparency, and accountability.

## Opportunities and Risks

- **Opportunities**: Improved efficiency, better healthcare, new creative tools, smarter education.  
- **Risks**: Bias in AI models, over-reliance on automation, privacy concerns, and potential misuse.  

## The Future Outlook

As AI becomes more accessible, it will empower individuals and small businesses just as much as large corporations. Education and awareness are critical to ensure society adapts positively to this transformation.

---

**Conclusion**  
AI is no longer the future — it is the present. How we choose to use and regulate it will define the next decade of human progress.
',
  'Capryos Team',
  'published',
  now(),
  ARRAY['AI', 'technology', 'future', 'automation'],
  5
);
