import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ - KrushiMandi",
  description: "Frequently asked questions about KrushiMandi agricultural marketplace.",
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h1>
          
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">What is Lorem Ipsum?</h2>
              <p className="text-gray-700 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
                ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                reprehenderit in voluptate velit esse cillum dolore.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Why do we use Lorem Ipsum?</h2>
              <p className="text-gray-700 leading-relaxed">
                It is a long established fact that a reader will be distracted by the readable content 
                of a page when looking at its layout. The point of using Lorem Ipsum is that it has a 
                more-or-less normal distribution of letters, as opposed to using content here, making 
                it look like readable English.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Where does it come from?</h2>
              <p className="text-gray-700 leading-relaxed">
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a 
                piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard 
                McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of 
                the more obscure Latin words, consectetur, from a Lorem Ipsum passage.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Where can I get some Lorem Ipsum?</h2>
              <p className="text-gray-700 leading-relaxed">
                There are many variations of passages of Lorem Ipsum available, but the majority have 
                suffered alteration in some form, by injected humour, or randomised words which dont 
                look even slightly believable. If you are going to use a passage of Lorem Ipsum, you 
                need to be sure there isnt anything embarrassing hidden.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Is it safe to use Lorem Ipsum?</h2>
              <p className="text-gray-700 leading-relaxed">
                All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as 
                necessary, making this the first true generator on the Internet. It uses a dictionary 
                of over 200 Latin words, combined with a handful of model sentence structures, to 
                generate Lorem Ipsum which looks reasonable.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">How long has Lorem Ipsum been used?</h2>
              <p className="text-gray-700 leading-relaxed">
                The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those 
                interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero 
                are also reproduced in their exact original form, accompanied by English versions from 
                the 1914 translation by H. Rackham.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Can I customize Lorem Ipsum?</h2>
              <p className="text-gray-700 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt 
                ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">What are the benefits of Lorem Ipsum?</h2>
              <p className="text-gray-700 leading-relaxed">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
                mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit 
                voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab 
                illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">How do I generate Lorem Ipsum?</h2>
              <p className="text-gray-700 leading-relaxed">
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia 
                consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro 
                quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed 
                quia non numquam eius modi tempora incidunt.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">What formats are available?</h2>
              <p className="text-gray-700 leading-relaxed">
                Ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis 
                nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea 
                commodi consequatur. Quis autem vel eum iure reprehenderit qui in ea voluptate velit 
                esse quam nihil molestiae consequatur.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Is Lorem Ipsum copyright free?</h2>
              <p className="text-gray-700 leading-relaxed">
                Vel illum qui dolorem eum fugiat quo voluptas nulla pariatur. At vero eos et accusamus 
                et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque 
                corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, 
                similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
