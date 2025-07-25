import testimonials from "../../public/data/testimonials.json";

const getTestimonials = () => {
  return testimonials || [];
};

export default getTestimonials;
