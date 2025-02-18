export default function Footer() {
  return (
    <div
      className="relative h-[500px] lg:h-[300px] bg-primary"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="relative h-[calc(100vh+500px)] lg:h-[calc(100vh+300px)] -top-[100vh]">
        <div className="h-[500px] top-[calc(100vh-500px)] lg:h-[300px] sticky lg:top-[calc(100vh-300px)] flex items-center justify-center">
          <div className="flex items-center justify-center text-white ">
            {/* Posizionamento assoluto per h2, p e Cta2 */}
            <div className=" flex flex-col md:items-center justify-center w-full lg:w-[90%] min-h-full px-4 mx-auto gap-4">
              <h2 className="text-3xl font-bold text-white md:text-center sm:text-4xl md:text-5xl">
                Footer
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
