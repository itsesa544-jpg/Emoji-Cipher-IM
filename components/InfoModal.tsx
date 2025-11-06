import React from 'react';
import Card from './Card';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <Card className="w-full max-w-2xl h-full max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">About IM Softwark</h2>
          <button onClick={onClose} className="text-2xl font-bold">&times;</button>
        </div>
        <div className="overflow-y-auto h-[calc(100%-48px)] pr-4 space-y-6 text-left" style={{ color: 'var(--text-secondary-color)'}}>
          
          <section>
            <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-color)'}}>🌐 IM Softwark</h3>
            <p className="mb-2">
              <span className="font-semibold">বাংলা:</span> IM Softworks একটি উদীয়মান সফটওয়্যার কোম্পানি, যা ভবিষ্যতমুখী প্রযুক্তি ও সৃজনশীল সমাধানের মাধ্যমে ক্লায়েন্টদের ব্যবসায়িক সাফল্যে সহায়তা করে। আমরা বিশ্বাস করি— আমাদের উন্নতি তখনই সম্ভব, যখন আমাদের ক্লায়েন্ট লাভবান হবেন।
            </p>
            <p className="mb-4">আমরা শুধু সফটওয়্যার তৈরি করি না — আমরা সম্ভাবনা গড়ে তুলি।</p>
            <p className="mb-2">
              <span className="font-semibold">English:</span> IM Softworks is an emerging software company that empowers clients’ business success through futuristic technology and innovative solutions. We believe that our growth is only possible when our clients benefit.
            </p>
            <p>We don’t just build software — We build possibilities.</p>
          </section>

          <section>
            <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-color)'}}>🎯 আমাদের লক্ষ্য (Our Mission)</h3>
            <div className="pl-4 border-l-4" style={{borderColor: 'var(--primary-color)'}}>
              <p className="mb-2"><span className="font-semibold">বাংলা:</span> “আপনার লাভই আমাদের সফলতা।” আমরা প্রতিটি প্রজেক্টে বিশ্বাস করি— যদি ক্লায়েন্ট উপকৃত হন, তবেই আমরা সফল। সেই লক্ষ্যেই আমাদের প্রতিটি কোড, প্রতিটি ডিজাইন এবং প্রতিটি আইডিয়া।</p>
              <p><span className="font-semibold">English:</span> “Your profit is our success.” In every project, we believe that our true achievement lies in the client’s benefit. That’s why every line of our code, every design, and every idea is driven by this mission.</p>
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-color)'}}>🔧 আমাদের সার্ভিসসমূহ (Our Services)</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-1">বাংলা:</h4>
                <ul className="list-disc list-inside">
                  <li>কাস্টম সফটওয়্যার ডেভেলপমেন্ট</li>
                  <li>ওয়েব অ্যাপ্লিকেশন</li>
                  <li>মোবাইল অ্যাপ</li>
                  <li>ক্লাউড সল্যুশন</li>
                  <li>API ডেভেলপমেন্ট</li>
                  <li>UI/UX ডিজাইন</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-1">English:</h4>
                <ul className="list-disc list-inside">
                  <li>Custom Software Development</li>
                  <li>Web Applications</li>
                  <li>Mobile Apps</li>
                  <li>Cloud Solutions</li>
                  <li>API Development</li>
                  <li>UI/UX Design</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
             <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-color)'}}>👋 About Me</h3>
             <div className="flex flex-col sm:flex-row items-center gap-4">
                <img src="https://res.cloudinary.com/dlklqihg6/image/upload/v1760308052/kkchmpjdp9izcjfvvo4k.jpg" alt="Mohammad Esa Ali" className="w-32 h-32 rounded-full object-cover border-4" style={{borderColor: 'var(--primary-color)'}}/>
                <div>
                  <p>Hello, I am Mohammad Esa Ali, a passionate and creative tech enthusiast. I specialize in Software Development, Web Solutions, and Creative Design. My goal is to help businesses grow by building smart, future-ready, and user-friendly digital solutions.</p>
                  <blockquote className="mt-2 pl-4 border-l-4 italic" style={{borderColor: 'var(--secondary-color)'}}>"Success comes when your clients succeed."</blockquote>
                </div>
             </div>
          </section>
          
          <section>
            <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-color)'}}>Connect with us</h3>
            <p>For inquiries, please contact us at:</p>
            <a href="mailto:im.softwark.team@gmail.com" className="block font-semibold" style={{color: 'var(--primary-color)'}}>im.softwark.team@gmail.com</a>
            <a href="tel:01792157184" className="block font-semibold" style={{color: 'var(--primary-color)'}}>01792157184</a>
          </section>
          
          <div className="text-center text-xs pt-4 border-t" style={{borderColor: 'var(--secondary-color)'}}>
            Copyright © IM Softwark
          </div>

        </div>
      </Card>
    </div>
  );
};

export default InfoModal;