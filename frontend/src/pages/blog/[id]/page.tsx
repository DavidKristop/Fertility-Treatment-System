import { Button } from "@/components/ui/button"
import NotFound from "@/pages/not-found/not-found"
import { Separator } from "@radix-ui/react-dropdown-menu"
import { ArrowLeft, Calendar, Facebook, Linkedin, Share2, Twitter } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import placeholder_img from "src/assets/placeholder.png"

// Mock blog data - same as in blog/page.tsx
const BLOG_POSTS = Array.from({ length: 23 }, (_, i) => ({
  id: i + 1,
  title: `Blog Post ${i + 1}`,
  excerpt:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.",
  content: `
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.</p>
    <p>Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.</p>
    <h2>Understanding Fertility Treatments</h2>
    <p>Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.</p>
    <p>Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.</p>
    <h2>The Journey to Parenthood</h2>
    <p>Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.</p>
    <p>Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.</p>
  `,
  author: "Dr. Jane Smith",
  authorTitle: "Reproductive Endocrinologist",
  authorImage: "",
  date: `${Math.floor(Math.random() * 28) + 1}/${Math.floor(Math.random() * 12) + 1}/2023`,
  image: ``,
  relatedPosts: [1, 2, 3].map((n) => {
    const relatedId = ((i + n) % 23) + 1
    return {
      id: relatedId,
      title: `Blog Post ${relatedId}`,
      image: ``,
    }
  }),
}))

export default function BlogPostPage() {
    const params = useParams()
    const postId = Number(params.id)

  // Find the blog post
  const post = BLOG_POSTS.find((post) => post.id === postId)

  // If post doesn't exist, show 404
  if (!post) {
    return NotFound()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link to="/blog">
              <Button variant="ghost" className="mb-6 pl-0 hover:bg-transparent hover:text-blue-600">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{post?.title}</h1>

            <div className="flex items-center gap-6 text-sm text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{post?.date}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="aspect-[2/1] overflow-hidden rounded-xl mb-10">
              <img src={post?.image || placeholder_img} alt={post?.title} className="w-full h-full object-cover" />
            </div>

            <div className="grid md:grid-cols-[1fr_3fr] gap-8">
              {/* Author Sidebar */}
              <div className="order-2 md:order-1">
                <div className="sticky top-8">
                  <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-xl mb-6">
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                      <img
                        src={post?.authorImage || placeholder_img}
                        alt={post?.author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-semibold">{post?.author}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{post?.authorTitle}</p>
                    <Button variant="outline" size="sm" className="w-full">
                      View Profile
                    </Button>
                  </div>

                  <div className="p-6 bg-slate-50 rounded-xl">
                    <h3 className="font-semibold mb-4">Share This Article</h3>
                    <div className="flex justify-center gap-4">
                      <Link to={`http://www.facebook.com/share.php?u=${window.location.href}`} className="cursor-pointer">
                        <Button variant="outline" size="icon" className="rounded-full">
                            <Facebook className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link to={`http://twitter.com/share?url=${window.location.href}`} className="cursor-pointer">
                        <Button variant="outline" size="icon" className="rounded-full">
                            <Twitter className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link to={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`} className="cursor-pointer">
                        <Button variant="outline" size="icon" className="rounded-full">
                            <Linkedin className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="outline" size="icon" className="rounded-full">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="order-1 md:order-2">
                <article className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post?.content || "" }} />

                <Separator className="my-12" />

                {/* Related Posts */}
                <div>
                  <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
                  <div className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-6">
                    {post?.relatedPosts.map((relatedPost) => (
                      <Link key={relatedPost.id} to={`/blog/${relatedPost.id}`}>
                        <div className="group flex gap-4 items-start">
                          <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden">
                            <img
                              src={relatedPost.image || placeholder_img}
                              alt={relatedPost.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium group-hover:text-blue-600 transition-colors">
                              {relatedPost.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">Read Article</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
