import React from "react";
import pkg from "file-saver";
const ProductOverview = ({
  heading = "Product Overview Heading",
  imageUrl = "/images/ITRAKER_PRODUCT.png",
  imageAlt = "Product Image",
  paragraphs = [],
  features = [],
  buttonText = "Request a Demo",
  buttonLink = "#",
  brochureUrl,
}) => {
  const { saveAs } = pkg;

  const handleDownload = async () => {
    saveAs(brochureUrl, "product-brochure.pdf");
  };
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12 lg:mb-16">
          {heading}
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16">
          <div className="md:w-4/12 flex justify-center p-1 border-2 border-yellow-400 rounded-lg">
            {" "}
            <img
              src={imageUrl}
              alt={imageAlt}
              className="rounded-lg  w-full max-w-[18rem]"
            />
          </div>

          <div className="md:w-7/12 text-gray-700">
            {paragraphs.map((text, index) => (
              <p
                key={index}
                className="mb-5 text-base md:text-lg leading-relaxed"
              >
                {text}
              </p>
            ))}

            {features.length > 0 && (
              <ul className="space-y-2 mb-8 list-disc list-inside text-base md:text-lg">
                {features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            )}

            <a href={buttonLink}>
              <button className="bg-yellow-400 border border-transparent text-black py-3 px-6 rounded-lg font-semibold hover:bg-yellow-500 hover:text-black transition">
                {buttonText}
              </button>
            </a>
            <button
              className="w-full sm:w-auto ml-2 text-black bg-transparent border-2 border-yellow-400 hover:text-white hover:bg-yellow-400 font-bold py-3 px-8 rounded-lg"
              onClick={handleDownload}
            >
              <span>Download</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductOverview;
