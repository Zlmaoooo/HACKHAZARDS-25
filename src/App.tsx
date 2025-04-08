import React, { useState, useEffect } from 'react';
import { MessageCircle, X, ChevronRight, Shield, AlertTriangle, Shield as ShieldIcon, Bell, Lock, ExternalLink } from 'lucide-react';

// Mock breach data
const MOCK_BREACHES = [
  { site: 'LinkedIn', year: 2023 },
  { site: 'Adobe', year: 2021 },
];

// Mock live ticker data
const MOCK_TICKER_ALERTS = [
  "5,342 emails leaked from Twitter (2 mins ago)",
  "New breach detected: 10,000+ accounts from Instagram (5 mins ago)",
  "Security alert: Major tech company database compromised (10 mins ago)",
];

function App() {
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(true);
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [breaches, setBreaches] = useState<typeof MOCK_BREACHES>([]);
  const [showChat, setShowChat] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [liveAlert, setLiveAlert] = useState('');
  const [tickerIndex, setTickerIndex] = useState(0);

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !agreed) return;
    
    setScanning(true);
    // Simulate API call
    setTimeout(() => {
      setBreaches(Math.random() > 0.5 ? MOCK_BREACHES : []);
      setScanned(true);
      setScanning(false);
    }, 2000);
  };

  useEffect(() => {
    if (scanned) {
      // Simulate live updates
      const timer = setTimeout(() => {
        setLiveAlert('New breach detected at Twitter 5 mins ago!');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [scanned]);

  // Live ticker effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((current) => (current + 1) % MOCK_TICKER_ALERTS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToScan = () => {
    document.getElementById('scan-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-primary/95 text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-primary/95 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <ShieldIcon className="h-8 w-8 text-accent animate-pulse" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-primary"></div>
            </div>
            <span className="text-xl font-bold">GuardianFlux</span>
          </div>
          <div className="flex items-center space-x-6">
            <a href="#features" className="hover:text-accent transition-colors">Features</a>
            <a href="#about" className="hover:text-accent transition-colors">About</a>
            <button 
              onClick={scrollToScan} 
              className="bg-accent text-primary px-6 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-accent/20"
            >
              Start Scan
            </button>
          </div>
        </div>
      </nav>

      {/* Live Alert Ticker */}
      <div className="bg-accent/10 border-b border-accent/20">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center space-x-2 overflow-hidden">
            <Bell className="h-4 w-4 text-accent animate-pulse" />
            <div className="animate-marquee whitespace-nowrap">
              <span className="text-sm">
                {MOCK_TICKER_ALERTS[tickerIndex]}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920')] opacity-10 bg-cover bg-center"></div>
        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center bg-accent/20 rounded-full px-4 py-2 mb-8">
            <Lock className="h-4 w-4 mr-2 text-accent" />
            <span className="text-sm">Trusted by 50,000+ users worldwide</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">
            GuardianFlux: Real-Time Breach Alerts
          </h1>
          <p className="text-xl mb-12 text-gray-300">
            Instant dark web monitoring powered by Fluvio's real-time tech.
            <br />
            No storage, no spam - just immediate alerts when your data is at risk.
          </p>
          <div className="max-w-md mx-auto bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-xl border border-white/10">
            <form onSubmit={handleScan} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter your email or phone number"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent pl-10"
                />
                <Shield className="absolute left-3 top-3.5 h-5 w-5 text-accent/50" />
              </div>
              <button
                type="submit"
                disabled={!email || scanning}
                className="w-full bg-accent text-primary font-bold py-3 rounded-lg disabled:opacity-50 transform hover:scale-105 transition-all duration-200 hover:shadow-lg hover:shadow-accent/20"
              >
                {scanning ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Scanning...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    Scan Now <ChevronRight className="inline ml-1" />
                  </span>
                )}
              </button>
              <label className="flex items-center text-sm text-gray-300 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mr-3 accent-accent"
                />
                <span className="group-hover:text-white transition-colors">
                  I agree to anonymous, one-time scanning
                </span>
              </label>
            </form>
          </div>
        </div>
      </section>

      {/* Results Section */}
      {scanned && (
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-xl border border-white/10">
            {breaches.length > 0 ? (
              <>
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/20">
                  <AlertTriangle className="h-8 w-8 text-red-500" />
                </div>
                <h2 className="text-2xl font-bold mb-6 text-center">
                  🔴 We found your data in {breaches.length} breaches!
                </h2>
                <ul className="mb-6 space-y-3">
                  {breaches.map((breach) => (
                    <li key={breach.site} className="flex items-center p-3 bg-white/5 rounded-lg">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                      <span className="flex-1">{breach.site}</span>
                      <span className="text-sm text-gray-400">({breach.year})</span>
                    </li>
                  ))}
                </ul>
                {liveAlert && (
                  <div className="bg-accent/20 border border-accent rounded-lg p-4 mb-6">
                    <AlertTriangle className="inline mr-2" />
                    {liveAlert}
                  </div>
                )}
                <button className="w-full bg-red-500 text-white font-bold py-3 rounded-lg hover:bg-red-600 transition-colors">
                  Take Action Now
                </button>
              </>
            ) : (
              <>
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/20">
                  <Shield className="h-8 w-8 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold mb-6 text-center">
                  🟢 Your data is safe! Celebrate 🎉
                </h2>
                <p className="text-gray-300 text-center mb-6">
                  <Shield className="inline mr-2" />
                  Enable 2FA everywhere for extra security.
                </p>
                <button className="w-full bg-accent text-primary font-bold py-3 rounded-lg hover:bg-opacity-90 transition-colors">
                  View Security Tips
                </button>
              </>
            )}
          </div>
        </section>
      )}

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">How GuardianFlux Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-accent/50 transition-colors group">
              <div className="text-accent mb-4 text-4xl font-bold">01</div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">Real-Time Monitoring</h3>
              <p className="text-gray-300">Fluvio's streaming tech continuously scans the dark web for your data.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-accent/50 transition-colors group">
              <div className="text-accent mb-4 text-4xl font-bold">02</div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">Instant Alerts</h3>
              <p className="text-gray-300">Get immediate notifications when your data appears in breaches.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-accent/50 transition-colors group">
              <div className="text-accent mb-4 text-4xl font-bold">03</div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">AI Analysis</h3>
              <p className="text-gray-300">Our AI provides personalized security recommendations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Chat Widget */}
      <div className="fixed bottom-4 right-4 z-50">
        {showChat && (
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 mb-4 w-80 shadow-xl border border-white/10">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-accent mr-2" />
                <h3 className="font-bold">Fluvio AI Assistant</h3>
              </div>
              <button onClick={() => setShowChat(false)} className="hover:text-accent transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="bg-white/5 rounded-lg p-3 mb-3">
              <p className="text-sm">
                {scanned
                  ? breaches.length > 0
                    ? "Change passwords here immediately! [Link]"
                    : "Stay safe! Avoid phishing emails."
                  : "Hi! Scan your email to get personalized security advice."}
              </p>
            </div>
            <div className="text-xs text-gray-400">Powered by Fluvio AI</div>
          </div>
        )}
        <button
          onClick={() => setShowChat(!showChat)}
          className="bg-accent text-primary p-3 rounded-full hover:bg-opacity-90 transition-colors shadow-lg transform hover:scale-105 duration-200 hover:shadow-accent/20"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      </div>

      {/* Footer */}
      <footer className="bg-white/5 mt-20 border-t border-white/10">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <ShieldIcon className="h-6 w-6 text-accent" />
                <span className="font-bold">GuardianFlux</span>
              </div>
              <p className="text-sm text-gray-400">
                Protecting your digital identity with real-time dark web monitoring.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#features" className="hover:text-accent transition-colors flex items-center"><span>Features</span><ExternalLink className="h-3 w-3 ml-1" /></a></li>
                <li><a href="#pricing" className="hover:text-accent transition-colors flex items-center"><span>Pricing</span><ExternalLink className="h-3 w-3 ml-1" /></a></li>
                <li><a href="#security" className="hover:text-accent transition-colors flex items-center"><span>Security</span><ExternalLink className="h-3 w-3 ml-1" /></a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#about" className="hover:text-accent transition-colors flex items-center"><span>About</span><ExternalLink className="h-3 w-3 ml-1" /></a></li>
                <li><a href="#careers" className="hover:text-accent transition-colors flex items-center"><span>Careers</span><ExternalLink className="h-3 w-3 ml-1" /></a></li>
                <li><a href="#contact" className="hover:text-accent transition-colors flex items-center"><span>Contact</span><ExternalLink className="h-3 w-3 ml-1" /></a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#privacy" className="hover:text-accent transition-colors flex items-center"><span>Privacy Policy</span><ExternalLink className="h-3 w-3 ml-1" /></a></li>
                <li><a href="#terms" className="hover:text-accent transition-colors flex items-center"><span>Terms of Service</span><ExternalLink className="h-3 w-3 ml-1" /></a></li>
                <li><button onClick={() => setShowModal(true)} className="hover:text-accent transition-colors flex items-center"><span>How it works</span><ExternalLink className="h-3 w-3 ml-1" /></button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2025 GuardianFlux. All rights reserved. A hackathon project.</p>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-primary border border-white/20 rounded-xl p-8 max-w-lg shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <Shield className="h-6 w-6 text-accent mr-2" />
                <h3 className="text-xl font-bold">How GuardianFlux Works</h3>
              </div>
              <button onClick={() => setShowModal(false)} className="hover:text-accent transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-gray-300 mb-4">
              GuardianFlux leverages Fluvio's real-time streaming technology to
              continuously monitor dark web breaches. When you enter your email,
              we check it against our breach database instantly, without storing
              any personal information.
            </p>
            <p className="text-gray-300">
              Live alerts are powered by Fluvio's event streaming, ensuring you're
              notified immediately when new breaches are detected.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;