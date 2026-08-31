import logo from '../assets/images/logo.png';

export default function Footer() {
  return (
    <footer className="bg-ink text-muted-dark py-16 pb-7">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-[1.3fr_1fr_1fr] gap-10 sm:gap-12 pb-11 border-b border-paper/10">
          <div>
            <div className="flex items-center gap-3 mb-3.5">
              <img src={logo} alt="ILA logo" className="w-9 h-9 object-contain" />
              <div className="font-serif text-xl text-paper">International Liberty Association</div>
            </div>
            <div>
              <a href="tel:02084523481" className="block text-[14.5px] mb-2 hover:text-gold-bright transition-colors">
                020 8452 3481
              </a>
              <a href="mailto:info@iliberty.org.uk" className="block text-[14.5px] mb-2 hover:text-gold-bright transition-colors">
                info@iliberty.org.uk
              </a>
            </div>
          </div>

          <div>
            <h5 className="text-[13px] text-paper font-semibold mb-4">Useful links</h5>
            <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
              <li><a href="https://iliberty.org.uk/stories-voices/" className="text-[14.5px] hover:text-gold-bright transition-colors">Stories &amp; Voices</a></li>
              <li><a href="https://iliberty.org.uk/partnerships/" className="text-[14.5px] hover:text-gold-bright transition-colors">Partnerships</a></li>
              <li><a href="https://iliberty.org.uk/leave-a-legacy/" className="text-[14.5px] hover:text-gold-bright transition-colors">Legacy</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-[13px] text-paper font-semibold mb-4">Support</h5>
            <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
              <li><a href="https://iliberty.org.uk/contact-us/" className="text-[14.5px] hover:text-gold-bright transition-colors">Contact us</a></li>
              <li><a href="https://iliberty.org.uk/feedback-form/" className="text-[14.5px] hover:text-gold-bright transition-colors">Feedback</a></li>
              <li><a href="https://iliberty.org.uk/privacy-policy/" className="text-[14.5px] hover:text-gold-bright transition-colors">Privacy policy</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap justify-between items-center gap-4 pt-6 text-[13px]">
          <span>Copyright © 2026 International Liberty Association — All rights reserved.</span>
          <div className="flex gap-4">
            <a href="https://x.com/ilibertyassoc" className="hover:text-gold-bright transition-colors">X</a>
            <a href="https://www.instagram.com/iliberty.a/" className="hover:text-gold-bright transition-colors">Instagram</a>
            <a
              href="https://www.facebook.com/people/International-Liberty-Association/61582798858498/"
              className="hover:text-gold-bright transition-colors"
            >
              Facebook
            </a>
            <a href="https://www.youtube.com/channel/UCNkLGpFt1-Rgq7m6GHUyI3A?reload=9" className="hover:text-gold-bright transition-colors">
              YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
