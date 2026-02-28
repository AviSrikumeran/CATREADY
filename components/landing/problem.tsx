export function Problem() {
  return (
    <section className="dark-section bg-cat-black py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          {/* Problem Statement */}
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            <span className="inline-block bg-cat-yellow text-cat-black px-3 py-1 mr-2">
              Manual inspections
            </span>
            are slow, inconsistent, and disconnected from the fleet.
          </p>

          <p className="mt-8 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            You fill out forms but never actually catch{" "}
            <span className="text-white/40">failures before they cost you.</span>
          </p>

          {/* Pivot */}
          <div className="mt-16 pt-16 border-t border-white/10">
            <p className="text-xl sm:text-2xl md:text-3xl text-white/90 leading-relaxed">
              With <span className="text-cat-yellow font-bold">CAT Ready</span>, 
              your voice becomes a structured report. Every inspection is standardized. 
              Every machine has a status. Every failure is flagged.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
