import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - KrushiMandi",
  description: "Learn about KrushiMandi and our mission to empower farmers and traders through technology.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">About Us</h1>
          
          <div className="prose prose-lg max-w-none space-y-6">
            <p className="text-gray-700 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
              irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
              deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error.
            </p>
            
            <p className="text-gray-700 leading-relaxed">
              Sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae 
              ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. 
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia 
              consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro 
              quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.
            </p>
            
            <p className="text-gray-700 leading-relaxed">
              Sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam 
              quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam 
              corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis autem 
              vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae 
              consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.
            </p>
            
            <p className="text-gray-700 leading-relaxed">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium 
              voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint 
              occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt 
              mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est 
              et expedita distinctio nam libero tempore.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
