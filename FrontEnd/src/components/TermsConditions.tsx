import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FileText, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'

const TermsConditions: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <section className="min-h-screen pt-44 pb-36 bg-[#0B0C10] relative z-10 overflow-hidden text-left">
      {/* Background shards and design lines */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-[15%] w-[40rem] h-[150%] bg-gradient-to-b from-white/[0.02] to-transparent skew-x-[-22deg] origin-top blur-[2px]" />
        <div className="absolute top-0 right-[40%] w-[15rem] h-[150%] bg-gradient-to-b from-white/[0.01] to-transparent skew-x-[-22deg] origin-top blur-[4px]" />
        <div className="absolute left-[33%] top-0 bottom-0 w-[1px] bg-white/[0.03]" />
        <div className="absolute left-[66%] top-0 bottom-0 w-[1px] bg-white/[0.03]" />
      </div>

      {/* Decorative vertical "TERMS" text */}
      <div 
        className="absolute right-6 top-[20%] text-[10rem] sm:text-[14rem] md:text-[18rem] lg:text-[22rem] font-urw font-black text-brand-white/[0.01] tracking-[0.1em] select-none pointer-events-none uppercase"
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
      >
        TERMS
      </div>

      <div className="max-w-[120rem] mx-auto px-6 md:px-12 lg:px-20 relative z-10 select-text">
        {/* Back Link */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-3 font-circe font-light text-[1.6rem] text-brand-text-muted hover:text-brand-gold transition-colors duration-300 mb-12 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Home Page
        </Link>

        {/* Header */}
        <div className="mb-20">
          <span className="font-circe font-light text-[1.4rem] tracking-[0.3em] text-brand-gold uppercase mb-4 block">
            Legal Agreement
          </span>
          <h1 className="font-urw font-extrabold text-[4.5rem] sm:text-[5.5rem] lg:text-[6.5rem] text-white uppercase tracking-wider leading-none mb-6">
            Terms & Conditions
          </h1>
          <p className="font-circe font-light text-[1.8rem] text-brand-text-muted max-w-[80rem]">
            Last updated: 17 December 2025. These Terms and Conditions outline the rules defining your interaction with the BackDrops website and our professional services.
          </p>
        </div>

        {/* Introduction text banner */}
        <div className="mb-12 p-8 sm:p-10 rounded-2xl bg-brand-dark-accent/20 border border-brand-gold/20 font-circe font-light text-[1.7rem] text-brand-white/95 leading-relaxed">
          These Terms and Conditions (“Terms”) are the rules that define your interaction with the website <a href="https://www.bexdxb.com/" className="text-brand-gold hover:underline">https://www.bexdxb.com/</a> (“Website”) run by BackDrops (“we”, “us”, “our”). Your access to or use of the website or our services is your consent to these Terms, which means that you agree to be legally bound by them. If this is not the case, you are not permitted to use the website or our services.
        </div>

        {/* Content Box */}
        <div className="space-y-16 bg-brand-dark-accent/10 border border-white/[0.04] p-10 sm:p-14 rounded-3xl backdrop-blur-md shadow-2xl">
          
          {/* Section 1 */}
          <div className="space-y-6">
            <h2 className="font-urw font-bold text-[2.4rem] text-brand-gold uppercase tracking-wide flex items-center gap-4">
              <span className="w-8 h-8 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center font-mono text-[1.4rem] text-brand-gold shrink-0">1</span>
              1. Definitions
            </h2>
            <div className="font-circe font-light text-[1.6rem] sm:text-[1.7rem] text-brand-text-muted leading-relaxed space-y-4 pl-12">
              <ul className="space-y-4 list-none pl-0">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0 mt-3.5" />
                  <span><strong>User / Client / You</strong> refers to any person or any legal organisation who is using the website or who has requested any services offered by BackDrops.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0 mt-3.5" />
                  <span><strong>Services</strong> are any services provided by BackDrops to You, including, but not limited to, exhibition stand design and construction, event organization, rental of exhibition space, provision of multimedia services, design of showrooms and retail spaces, printing and production of promotional stands, provision of catering services related to exhibitions, and any other services that are offered by BackDrops.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0 mt-3.5" />
                  <span><strong>Content</strong> includes any available text, any images, graphics, videos, and audio materials, designs, 3D models, other drawings and plans, and any other materials that you provided or that were made available to you as part of Services.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Section 2 */}
          <div className="space-y-6">
            <h2 className="font-urw font-bold text-[2.4rem] text-brand-gold uppercase tracking-wide flex items-center gap-4">
              <span className="w-8 h-8 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center font-mono text-[1.4rem] text-brand-gold shrink-0">2</span>
              2. Scope of Services & Usage
            </h2>
            <div className="font-circe font-light text-[1.6rem] sm:text-[1.7rem] text-brand-text-muted leading-relaxed space-y-4 pl-12">
              <p>
                2.1. The Website details the Services offered by BackDrops. A request made through the Website or the submission of a “Send Request” form is a non-binding indication of interest until a formal agreement is signed.
              </p>
              <p>
                2.2. Services will only be extended to you after an explicit agreement between you and BackDrops has been reached, evidenced by a mutually signed proposal/contract (or email confirmation) detailing the scope, deliverables, timeline, charges, payment terms, and other relevant terms.
              </p>
              <p>
                2.3. BackDrops reserves the right to refuse or discontinue the provision of Services (or access to the Website) at its sole discretion. Without limiting the reasons, this comprises the case where a user submits false or incomplete information; misuses the Website; or if it is determined that the continuation of the engagement would violate our internal policies or applicable laws.
              </p>
            </div>
          </div>

          {/* Section 3 */}
          <div className="space-y-6">
            <h2 className="font-urw font-bold text-[2.4rem] text-brand-gold uppercase tracking-wide flex items-center gap-4">
              <span className="w-8 h-8 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center font-mono text-[1.4rem] text-brand-gold shrink-0">3</span>
              3. Intellectual Property
            </h2>
            <div className="font-circe font-light text-[1.6rem] sm:text-[1.7rem] text-brand-text-muted leading-relaxed space-y-4 pl-12">
              <p>
                3.1. Everything on the Site, such as content, text, images, logos, graphic design, 3D mockups, layouts, and everything else, will be the property of BackDrops and will be protected under copyright, trademark, and other intellectual laws.
              </p>
              <p>
                3.2. BackDrops allows users to have access to the Site for personal use as long as copyright or other ownership notifications are kept on any downloaded and/or printed materials. You are not allowed, without prior explicit written permission, to duplicate, share, change, publish, or distribute the Contents in any manner.
              </p>
            </div>
          </div>

          {/* Section 4 */}
          <div className="space-y-6">
            <h2 className="font-urw font-bold text-[2.4rem] text-brand-gold uppercase tracking-wide flex items-center gap-4">
              <span className="w-8 h-8 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center font-mono text-[1.4rem] text-brand-gold shrink-0">4</span>
              4. User Obligations / Acceptable Use
            </h2>
            <div className="font-circe font-light text-[1.6rem] sm:text-[1.7rem] text-brand-text-muted leading-relaxed space-y-4 pl-12">
              <p>
                4.1. You are obligated not to use the Site in ways that are unlawful, deceptive, or contrary to any applicable laws or regulations. You also agree not to upload anything that contains any harmful code, such as viruses and/or malware, to interfere with any functionality of the Site or to try to gain unauthorised access to our systems.
              </p>
              <p>
                4.2. You also cannot, without our prior written permission, copy or gather any data from the Site to use in making a database or other directory.
              </p>
            </div>
          </div>

          {/* Section 5 */}
          <div className="space-y-6">
            <h2 className="font-urw font-bold text-[2.4rem] text-brand-gold uppercase tracking-wide flex items-center gap-4">
              <span className="w-8 h-8 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center font-mono text-[1.4rem] text-brand-gold shrink-0">5</span>
              5. Limitation of Liability & Disclaimers
            </h2>
            <div className="font-circe font-light text-[1.6rem] sm:text-[1.7rem] text-brand-text-muted leading-relaxed space-y-4 pl-12">
              <p>
                5.1. The Website (and its Content) are accessible to you in their current state without any changes (the current condition of the service). We cannot be held responsible for any damage (regardless of its nature) or harm that you may suffer in connection with the following cases:
              </p>
              <ul className="space-y-3 list-none pl-4">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0 mt-3.5" />
                  <span>Using or being unable to use the Website and any Content on the Website. Based on any Content provided, it includes the Service being delayed or not provided. At any time or in any way.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0 mt-3.5" />
                  <span>By accepting the Service, you acknowledge that all designs, arrangements, 3D templates, and offers are subject to changes that may be made. BackDrops cannot guarantee the success of any circumstances.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0 mt-3.5" />
                  <span>Approval of laws and regulations (regardless of their nature), participation in the event, and successful applications as an exhibitor.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Section 6 */}
          <div className="space-y-6">
            <h2 className="font-urw font-bold text-[2.4rem] text-brand-gold uppercase tracking-wide flex items-center gap-4">
              <span className="w-8 h-8 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center font-mono text-[1.4rem] text-brand-gold shrink-0">6</span>
              6. Payment Terms (When Applicable)
            </h2>
            <div className="font-circe font-light text-[1.6rem] sm:text-[1.7rem] text-brand-text-muted leading-relaxed space-y-4 pl-12">
              <p>
                If services are subjected to fees (design, construction, installation, rental, etc.), the payment terms will be indicated in a separate Service Agreement/Proposal. In general, unless otherwise specifically provisioned in the agreement:
              </p>
              <ul className="space-y-3 list-none pl-4">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0 mt-3.5" />
                  <span>A full or partial payment may be required before the performance of the service.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0 mt-3.5" />
                  <span>Once production or procurement starts, the fees will not be refundable.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0 mt-3.5" />
                  <span>If there are any additional costs as a result of your request for changes, delays, or requirements of a third party, those costs may be invoiced separately.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Section 7 */}
          <div className="space-y-6">
            <h2 className="font-urw font-bold text-[2.4rem] text-brand-gold uppercase tracking-wide flex items-center gap-4">
              <span className="w-8 h-8 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center font-mono text-[1.4rem] text-brand-gold shrink-0">7</span>
              7. Termination / Cancellation
            </h2>
            <div className="font-circe font-light text-[1.6rem] sm:text-[1.7rem] text-brand-text-muted leading-relaxed space-y-4 pl-12">
              <p>
                7.1. In case you violate any of these terms, we maintain the authority to discontinue or revoke your right to use the Website or the Services, and we may take such action, at our sole discretion, with or without prior notification to you, and we will not have to disclose our decision to you.
              </p>
              <p>
                7.2. After this contract is terminated, you will need to pay the outstanding amount for the services you have received to this point.
              </p>
              <p>
                7.3. We have the right to suspend any work in progress, and access to any design files or proposals may be limited until full payment is received.
              </p>
              <p>
                7.4. If and when the agreement is terminated, your access to the design files or proposals may be revoked until such time as payment is made.
              </p>
            </div>
          </div>

          {/* Section 8 */}
          <div className="space-y-6">
            <h2 className="font-urw font-bold text-[2.4rem] text-brand-gold uppercase tracking-wide flex items-center gap-4">
              <span className="w-8 h-8 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center font-mono text-[1.4rem] text-brand-gold shrink-0">8</span>
              8. External Links & Third-Party Content
            </h2>
            <div className="font-circe font-light text-[1.6rem] sm:text-[1.7rem] text-brand-text-muted leading-relaxed space-y-4 pl-12">
              <p>
                The Website may additionally offer links to the web pages of other people or third-party content (e.g., social media, partner sites). We do not accept liability for the accuracy, completeness, or business conduct of the linked sites or third-party content. It is entirely up to you to decide whether to take advantage of the external links.
              </p>
            </div>
          </div>

          {/* Section 9 */}
          <div className="space-y-6">
            <h2 className="font-urw font-bold text-[2.4rem] text-brand-gold uppercase tracking-wide flex items-center gap-4">
              <span className="w-8 h-8 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center font-mono text-[1.4rem] text-brand-gold shrink-0">9</span>
              9. Changes to Terms
            </h2>
            <div className="font-circe font-light text-[1.6rem] sm:text-[1.7rem] text-brand-text-muted leading-relaxed space-y-4 pl-12">
              <p>
                We are entitled to amend or update these Terms whenever we see fit. We implement changes by posting them on the Website. It is up to you whether to keep using the Website or Services, and this indicates your acceptance of the Terms that have been changed.
              </p>
            </div>
          </div>

          {/* Section 10 */}
          <div className="space-y-6">
            <h2 className="font-urw font-bold text-[2.4rem] text-brand-gold uppercase tracking-wide flex items-center gap-4">
              <span className="w-8 h-8 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center font-mono text-[1.4rem] text-brand-gold shrink-0">10</span>
              10. Contact Information
            </h2>
            <div className="font-circe font-light text-[1.6rem] sm:text-[1.7rem] text-brand-text-muted leading-relaxed space-y-4 pl-12">
              <p>
                For any queries about these Terms or our Services, contact us at:
              </p>
              <p className="bg-white/[0.02] border border-white/5 p-6 rounded-lg max-w-xl">
                <strong>Backdrops Technical Services L.L.C</strong><br />
                Warehouse no- 6, Gate no.13<br />
                Jebel Ali Industrial area 1<br />
                Dubai - United Arab Emirates<br />
                Email: <a href="mailto:info@backdrops.ae" className="text-brand-gold hover:underline">info@backdrops.ae</a><br />
                Phone: +971 55 229 1691
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default TermsConditions
