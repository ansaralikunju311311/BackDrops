import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Shield, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'

const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <section className="min-h-screen pt-16 pb-36 bg-[#0B0C10] relative z-10 overflow-hidden text-left">
      {/* Background shards and design lines */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-[15%] w-[40rem] h-[150%] bg-gradient-to-b from-white/[0.02] to-transparent skew-x-[-22deg] origin-top blur-[2px]" />
        <div className="absolute top-0 right-[40%] w-[15rem] h-[150%] bg-gradient-to-b from-white/[0.01] to-transparent skew-x-[-22deg] origin-top blur-[4px]" />
        <div className="absolute left-[33%] top-0 bottom-0 w-[1px] bg-white/[0.03]" />
        <div className="absolute left-[66%] top-0 bottom-0 w-[1px] bg-white/[0.03]" />
      </div>

      {/* Decorative vertical "PRIVACY" text */}
      <div 
        className="absolute right-6 top-[20%] text-[10rem] sm:text-[14rem] md:text-[18rem] lg:text-[22rem] font-urw font-black text-brand-white/[0.01] tracking-[0.1em] select-none pointer-events-none uppercase"
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
      >
        PRIVACY
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
            Legal Statement
          </span>
          <h1 className="font-urw font-extrabold text-[4.5rem] sm:text-[5.5rem] lg:text-[6.5rem] text-white uppercase tracking-wider leading-none mb-6">
            Privacy Policy
          </h1>
          <p className="font-circe font-light text-[1.8rem] text-brand-text-muted max-w-[80rem]">
            Last updated: June 5, 2026. This Privacy Policy outlines our principles, legal grounds, and procedures regarding the collection, processing, and protection of your personal data when using the BackDrops service.
          </p>
        </div>

        {/* Content Box */}
        <div className="space-y-16 bg-brand-dark-accent/10 border border-white/[0.04] p-10 sm:p-14 rounded-3xl backdrop-blur-md shadow-2xl">
          
          {/* Section 1 */}
          <div className="space-y-6">
            <h2 className="font-urw font-bold text-[2.4rem] text-brand-gold uppercase tracking-wide flex items-center gap-4">
              <span className="w-8 h-8 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center font-mono text-[1.4rem] text-brand-gold shrink-0">1</span>
              1. General Provisions
            </h2>
            <div className="font-circe font-light text-[1.6rem] sm:text-[1.7rem] text-brand-text-muted leading-relaxed space-y-4 pl-12">
              <p>
                1.1. This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You and defines the position of <strong>Backdrops Technical Services L.L.C</strong> (hereinafter – the Operator) in terms of processing and protection of personal data.
              </p>
              <p>
                1.2. Basic concepts used in the Policy:
              </p>
              <ul className="space-y-3 list-none pl-4">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0 mt-3.5" />
                  <span><strong>Personal data</strong> is any information related directly or indirectly specific or identifiable individual (citizen);</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0 mt-3.5" />
                  <span><strong>Personal data subject</strong> is any capable individual (in respect of whom the Operator processes personal data) whose personal data is processed by the Operator;</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0 mt-3.5" />
                  <span><strong>Processing of personal data</strong> is any action (operation) or set of actions (operations) with personal data performed with and without automation tools. Such actions (operations) are the following: collection, receiving, recording, systematization, storage, refinement (update, changing), mining, usage, transfer (diffusion, provision, access), anonymization, blocking, deletion, destruction of personal data;</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0 mt-3.5" />
                  <span><strong>Website</strong> is a web resource obtained by the Operator at www.bexdxb.com;</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0 mt-3.5" />
                  <span><strong>A website user (User)</strong> – any visitor to the Website, including but not limited, by means of submitting the Application;</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0 mt-3.5" />
                  <span><strong>Application</strong> is an expression of the User’s will to consider the possibility of purchasing the Operator’s services or works with the purpose of concluding a contract with the Operator.</span>
                </li>
              </ul>
              <p>
                1.3. The Policy is applied to the processing of personal data which the Operator may receive in the course of and as a result of interaction with the User, in particular in the course of using the Website, as well as any other means of communication with the Operator.
              </p>
              <p>
                1.4. By submitting an Application on the Website, the User provides consent to the processing of their personal data in accordance with the terms and conditions stipulated by the Policy and the current legislation of the UAE. The use of the Site by the User also means their unconditional consent to the Policy and the terms of personal data processing specified therein. If the User does not agree with the terms of this Policy, the User should refrain from using the Site.
              </p>
              <p>
                1.5. The Policy applies to personal data collected both before and after this Policy is put into effect.
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="space-y-6">
            <h2 className="font-urw font-bold text-[2.4rem] text-brand-gold uppercase tracking-wide flex items-center gap-4">
              <span className="w-8 h-8 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center font-mono text-[1.4rem] text-brand-gold shrink-0">2</span>
              2. Purposes and legal grounds for processing personal data
            </h2>
            <div className="font-circe font-light text-[1.6rem] sm:text-[1.7rem] text-brand-text-muted leading-relaxed space-y-4 pl-12">
              <p>
                2.1 Processing of personal data is subject to legal grounds for such processing, in particular:
              </p>
              <ul className="space-y-3 list-none pl-4">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0 mt-3.5" />
                  <span>The consent of the User, expressed in any form that allows to confirm the fact of obtaining consent, including by the means specified in paragraph 1.4. hereof;</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0 mt-3.5" />
                  <span>Personal data processing is necessary for performance of the contract, to which the User is a party, as well as for conclusion of the contract on the initiative of the User;</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0 mt-3.5" />
                  <span>Personal data processing is necessary for the implementation and performance of the functions, powers and duties assigned to the Operator by the legislation of the UAE;</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0 mt-3.5" />
                  <span>Personal data processing is necessary for the execution of rights and legitimate interests of the Operator (e.g. processing of cookies for the purposes of proper functioning of the Site and its improvement).</span>
                </li>
              </ul>
              <p>
                2.2 The Operator processes the User’s personal data only in case when the User provides it (filled in and (or) sent) through a special form on the Website or in other cases when the User submits their data to the Operator to make an Application or other actions related to the conclusion, execution or termination of the contract.
              </p>
              <p>
                2.3. The Operator processes the User’s anonymised data if it is allowed in the User’s browser settings.
              </p>
              <p>
                2.4. The Operator Processes the User’s Personal Data for the following purposes:
              </p>
              <ul className="space-y-3 list-none pl-4">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0 mt-3.5" />
                  <span>To form and send a commercial offer in the User’s Application, to conclude and/or execute any contract between the Operator and the User or between the Operator and a third party, whose interests are represented by the User;</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0 mt-3.5" />
                  <span>To exercise the rights and legitimate interests of the Operator or third parties or to achieve socially significant purposes, provided that the rights of the User are not violated;</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0 mt-3.5" />
                  <span>For statistical or other marketing and research purposes, subject to mandatory anonymisation of personal data.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Section 3 */}
          <div className="space-y-6">
            <h2 className="font-urw font-bold text-[2.4rem] text-brand-gold uppercase tracking-wide flex items-center gap-4">
              <span className="w-8 h-8 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center font-mono text-[1.4rem] text-brand-gold shrink-0">3</span>
              3. Categories of Personal Data processed
            </h2>
            <div className="font-circe font-light text-[1.6rem] sm:text-[1.7rem] text-brand-text-muted leading-relaxed space-y-4 pl-12">
              <p>
                3.1. The Operator processes the following categories of Users’ Personal Data: last name, name, patronymic, phone number, e-mail address, cookies. By visiting the Website, the User agrees to the processing of cookies by the Operator until they change/restrict the use of cookies in the settings of their browser.
              </p>
              <p>
                3.2. The Operator automatically receives certain types of information in the course of Users’ interaction with the Site, through the use of technologies and services such as web protocols, cookies, webtags, as well as third party applications and tools.
              </p>
              <p>
                In this case, web tags, cookies and other monitoring technologies do not allow you to automatically receive personal data. If the User of the Website at their discretion provides their personal data, for example, when completing the Application, then only then the processes of automatic collection of detailed information for the convenience of using the websites and (or) to improve interaction with Users are launched.
              </p>
            </div>
          </div>

          {/* Section 4 */}
          <div className="space-y-6">
            <h2 className="font-urw font-bold text-[2.4rem] text-brand-gold uppercase tracking-wide flex items-center gap-4">
              <span className="w-8 h-8 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center font-mono text-[1.4rem] text-brand-gold shrink-0">4</span>
              4. Procedure for processing personal data
            </h2>
            <div className="font-circe font-light text-[1.6rem] sm:text-[1.7rem] text-brand-text-muted leading-relaxed space-y-4 pl-12">
              <p>
                4.1. The Operator does not process personal data concerning race, nationality, political views, religious, philosophical and other beliefs, state of health, personal life, membership in public associations, including trade unions or biometric data.
              </p>
              <p>
                4.2. The operator processes personal data using databases located in the UAE and does not transfer personal data across borders.
              </p>
              <p>
                4.3. The Operator has the right to entrust the processing of personal data to third parties with the consent of the User on the basis of the contract concluded with such third parties for the processing of Users’ requests.
              </p>
              <p>
                4.4. Persons processing personal data on the basis of the contract concluded with the Operator, undertake to comply with the principles and rules of processing and protection of personal data, provided by the current legislation of the UAE. For each third party, the contract shall specify the list of actions (transactions) with personal data and the purposes of processing to be performed by the third party processing personal data. This third party is also obliged to respect the confidentiality and security of personal data when processing them. Requirements for the protection of personal data processed are specified in accordance with the current legislation of the UAE.
              </p>
              <p>
                4.5. The Operator has the right to transfer personal data to third parties with the consent of the subject of personal data in the following cases:
              </p>
              <ul className="space-y-3 list-none pl-4">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0 mt-3.5" />
                  <span>4.5.1 In order to protect the rights and legitimate interests of the Operator or third parties in cases where the subject of personal data violates any terms and conditions of the user documents of the Site and (or) of this Policy.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0 mt-3.5" />
                  <span>4.5.2 According to a court decision that has entered into force or in cases stipulated by the current legislation of the UAE.</span>
                </li>
              </ul>
              <p>
                4.6 The operator has the right to transfer personal data to third parties in cases where the possibility of transferring personal data to third parties is expressly provided by the legislation of the UAE and does not require the consent of the subject of personal data.
              </p>
              <p>
                4.7 In order to meet the requirements of the current legislation of the UAE and its contractual obligations, the Operator shall process personal data both with and without the use of automation tools. The set of processing operations includes collection, recording, systematisation, accumulation, storage, clarification (updating, modification), extraction, use, transfer (granting, access), anonymisation, blocking, deletion, destruction of personal data. The Operator may only process personal data authorised by the User for dissemination if proper consent is obtained or if there are legal grounds, as well as if other requirements of the Law are met.
              </p>
              <p>
                4.8 The Operator does not check and, as a rule, does not have the opportunity to check the relevance and reliability of the information provided by the User, received through the Website. The Operator assumes that the User, acting reasonably and in good faith, provides reliable and sufficient personal data and maintains its up-to-date state.
              </p>
            </div>
          </div>

          {/* Section 5 */}
          <div className="space-y-6">
            <h2 className="font-urw font-bold text-[2.4rem] text-brand-gold uppercase tracking-wide flex items-center gap-4">
              <span className="w-8 h-8 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center font-mono text-[1.4rem] text-brand-gold shrink-0">5</span>
              5. The User’s rights
            </h2>
            <div className="font-circe font-light text-[1.6rem] sm:text-[1.7rem] text-brand-text-muted leading-relaxed space-y-4 pl-12">
              <p>
                5.1 The User has the right:
              </p>
              <ul className="space-y-3 list-none pl-4">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0 mt-3.5" />
                  <span>5.1.1 At any time, change (update, supplement) the personal data provided by them by contacting the Operator by any available means (by filling out the Application, by sending an e-mail, etc.).</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0 mt-3.5" />
                  <span>5.1.2 Delete the personal data provided by sending a written notice to the Operator indicating the personal data to be deleted.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0 mt-3.5" />
                  <span>5.1.3 Receive information from the Operator regarding the processing of their personal data.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0 mt-3.5" />
                  <span>5.1.4 Require that the Operator clarify, block or destroy personal data if the personal data is incomplete, outdated, inaccurate, illegally obtained or is not necessary for the stated purpose of processing.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0 mt-3.5" />
                  <span>5.1.5 To withdraw their consent to the processing of personal data at any time by sending a written notice to the Operator’s address. Upon receipt of such notice, the processing of the User’s personal data will be terminated and their personal data will be deleted, except for cases when the processing may be continued in accordance with the legislation of the UAE.</span>
                </li>
              </ul>
              <p>
                5.2. The Rights under para. 5.1. of this Policy may be restricted in accordance with the requirements of the legislation of the UAE and (or) in cases when the Operator performs processing of personal data on legal grounds other than the consent of the User.
              </p>
            </div>
          </div>

          {/* Section 6 */}
          <div className="space-y-6">
            <h2 className="font-urw font-bold text-[2.4rem] text-brand-gold uppercase tracking-wide flex items-center gap-4">
              <span className="w-8 h-8 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center font-mono text-[1.4rem] text-brand-gold shrink-0">6</span>
              6. Obligations of the Operator
            </h2>
            <div className="font-circe font-light text-[1.6rem] sm:text-[1.7rem] text-brand-text-muted leading-relaxed space-y-4 pl-12">
              <p>
                6.1 In accordance with the requirements of the Law, the Operator shall:
              </p>
              <ul className="space-y-3 list-none pl-4">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0 mt-3.5" />
                  <span>6.1.1 To provide the User, upon request, with information relating to the processing of their personal data, or to provide a legal refusal within thirty days from the date of receipt of the User’s request.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0 mt-3.5" />
                  <span>6.1.2 Upon request of the User to clarify, block or delete the processed personal data, if the personal data is incomplete, outdated, inaccurate, illegally obtained or is not necessary for the stated purpose of processing within the term, not exceeding seven working days from the date of submission by the User of information confirming these facts.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0 mt-3.5" />
                  <span>6.1.3 If the User withdraws consent to the processing of personal data, the Operator shall terminate the processing of personal data and destroy the personal data within a period not exceeding thirty days from the date of receipt of the said withdrawal, unless otherwise provided by agreement between the Operator and the User.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Section 7 */}
          <div className="space-y-6">
            <h2 className="font-urw font-bold text-[2.4rem] text-brand-gold uppercase tracking-wide flex items-center gap-4">
              <span className="w-8 h-8 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center font-mono text-[1.4rem] text-brand-gold shrink-0">7</span>
              7. Personal Data Protection
            </h2>
            <div className="font-circe font-light text-[1.6rem] sm:text-[1.7rem] text-brand-text-muted leading-relaxed space-y-4 pl-12">
              <p>
                7.1. The Operator, when processing personal data, takes the necessary legal, organisational and technical measures to protect personal data from unlawful and (or) unauthorised access to it, destruction, modification, blocking, copying, provision, dissemination of personal data, as well as from other unlawful actions in relation to the personal data of the User.
              </p>
            </div>
          </div>

          {/* Section 8 */}
          <div className="space-y-6">
            <h2 className="font-urw font-bold text-[2.4rem] text-brand-gold uppercase tracking-wide flex items-center gap-4">
              <span className="w-8 h-8 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center font-mono text-[1.4rem] text-brand-gold shrink-0">8</span>
              8. The terms of processing (storage) of Personal Data
            </h2>
            <div className="font-circe font-light text-[1.6rem] sm:text-[1.7rem] text-brand-text-muted leading-relaxed space-y-4 pl-12">
              <p>
                8.1. The processing time for personal data is determined on the basis of the purposes of processing personal data and the user’s consent in accordance with the validity period of the contracts with the User and the requirements of the legislation of the UAE:
              </p>
              <ul className="space-y-3 list-none pl-4">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0 mt-3.5" />
                  <span>Personal data of Users, who have left the Application, shall be kept for three years from the date of sending the Application, unless another storage period arises from the term of the contract with the User or other person whose interests are represented by the User;</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0 mt-3.5" />
                  <span>Personal data of other persons applying to the Operator for the alleged violation of their rights shall be kept for the entire period of processing and consideration of the respective claims, as well as for three years from the date of completion of processing and (or) processing of the claim, if the legislation of the UAE does not provide for another period of limitation for the relevant disputes.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Section 9 */}
          <div className="space-y-6">
            <h2 className="font-urw font-bold text-[2.4rem] text-brand-gold uppercase tracking-wide flex items-center gap-4">
              <span className="w-8 h-8 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center font-mono text-[1.4rem] text-brand-gold shrink-0">9</span>
              9. Other provisions
            </h2>
            <div className="font-circe font-light text-[1.6rem] sm:text-[1.7rem] text-brand-text-muted leading-relaxed space-y-4 pl-12">
              <p>
                9.1. The Operator may periodically make changes to this Policy, including to reflect changes in the scope of services provided by the Operator or changes in the functionality of the Site, as well as changes in the legislation of the UAE. The new version of the Policy shall enter into force on the date of its publication unless it specifies another date of entry into force.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default PrivacyPolicy
