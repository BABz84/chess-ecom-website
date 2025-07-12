import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service",
}

export default function TermsPage() {
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto bg-white p-8 lg:p-12 rounded-lg shadow-md">
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-8 border-b pb-4">Terms of Service</h1>

          <div className="space-y-6 text-slate-700">
            <p className="text-lg leading-relaxed">
              This website is operated by Mansa Gallery. Throughout the site, the terms “we”, “us” and “our” refer to Mansa Gallery. Mansa Gallery offers this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.
            </p>
            <p>
              By visiting our site and/ or purchasing something from us, you engage in our “Service” and agree to be bound by the following terms and conditions (“Terms of Service”, “Terms”), including those additional terms and conditions and policies referenced herein and/or available by hyperlink. These Terms of Service apply to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/ or contributors of content.
            </p>
            <p>
              Please read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services. If these Terms of Service are considered an offer, acceptance is expressly limited to these Terms of Service.
            </p>
            <p>
              Any new features or tools which are added to the current store shall also be subject to the Terms of Service. You can review the most current version of the Terms of Service at any time on this page. We reserve the right to update, change or replace any part of these Terms of Service by posting updates and/or changes to our website. It is your responsibility to check this page periodically for changes. Your continued use of or access to the website following the posting of any changes constitutes acceptance of those changes.
            </p>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-800 border-b pb-2">Section 1 - Online Store Terms</h2>
              <p>
                By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.
              </p>
              <p>
                You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws).
              </p>
              <p>
                You must not transmit any worms or viruses or any code of a destructive nature.
              </p>
              <p>
                A breach or violation of any of the Terms will result in an immediate termination of your Services.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-800 border-b pb-2">Section 2 - General Conditions</h2>
              <p>
                We reserve the right to refuse service to anyone for any reason at any time.
              </p>
              <p>
                You understand that your content (not including credit card information), may be transferred unencrypted and involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices. Credit card information is always encrypted during transfer over networks.
              </p>
              <p>
                You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service or any contact on the website through which the service is provided, without express written permission by us.
              </p>
              <p>
                The headings used in this agreement are included for convenience only and will not limit or otherwise affect these Terms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
