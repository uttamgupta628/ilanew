import groupPhoto from '../assets/images/about_section.png';

export default function GroupPhotoBanner() {
  return (
    <section className="relative w-full">
      <img
        src={groupPhoto}
        alt="ILA volunteers and supporters gathered together"
        className="h-auto w-full object-cover"
      />
    </section>
  );
}