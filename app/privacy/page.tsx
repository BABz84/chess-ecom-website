import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
}

export default function PrivacyPage() {
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto bg-white p-8 lg:p-12 rounded-lg shadow-md">
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-8 border-b pb-4">Privacy Policy</h1>

          <div className="space-y-6 text-slate-700">
            <p className="text-lg leading-relaxed">
              This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from this website.
            </p>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-800 border-b pb-2">Personal Information We Collect</h2>
              <p>
                When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site. We refer to this automatically-collected information as “Device Information.”
              </p>
              <p>We collect Device Information using the following technologies:</p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>
                  <strong>“Cookies”</strong> are data files that are placed on your device or computer and often include an anonymous unique identifier. For more information about cookies, and how to disable cookies, visit{" "}
                  <a href="http://www.allaboutcookies.org" className="text-red-600 hover:underline" target="_blank" rel="noopener noreferrer">
                    http://www.allaboutcookies.org
                  </a>.
                </li>
                <li>
                  <strong>“Log files”</strong> track actions occurring on the Site, and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps.
                </li>
                <li>
                  <strong>“Web beacons,” “tags,” and “pixels”</strong> are electronic files used to record information about how you browse the Site.
                </li>
              </ul>
              <p>
                Additionally when you make a purchase or attempt to make a purchase through the Site, we collect certain information from you, including your name, billing address, shipping address, payment information (including credit card numbers), email address, and phone number. We refer to this information as “Order Information.”
              </p>
              <p>
                When we talk about “Personal Information” in this Privacy Policy, we are talking both about Device Information and Order Information.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-800 border-b pb-2">How Do We Use Your Personal Information?</h2>
              <p>
                We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations). Additionally, we use this Order Information to:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Communicate with you;</li>
                <li>Screen our orders for potential risk or fraud; and</li>
                <li>
                  When in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.
                </li>
              </ul>
              <p>
                We use the Device Information that we collect to help us screen for potential risk and fraud (in particular, your IP address), and more generally to improve and optimize our Site (for example, by generating analytics about how our customers browse and interact with the Site, and to assess the success of our marketing and advertising campaigns).
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-800 border-b pb-2">Sharing Your Personal Information</h2>
              <p>
                We share your Personal Information with third parties to help us use your Personal Information, as described above. For example, we use Shopify to power our online store--you can read more about how Shopify uses your Personal Information here:{" "}
                <a href="https://www.shopify.com/legal/privacy" className="text-red-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  https://www.shopify.com/legal/privacy
                </a>. We also use Google Analytics to help us understand how our customers use the Site--you can read more about how Google uses your Personal Information here:{" "}
                <a href="https://www.google.com/intl/en/policies/privacy/" className="text-red-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  https://www.google.com/intl/en/policies/privacy/
                </a>. You can also opt-out of Google Analytics here:{" "}
                <a href="https://tools.google.com/dlpage/gaoptout" className="text-red-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  https://tools.google.com/dlpage/gaoptout
                </a>.
              </p>
              <p>
                Finally, we may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
