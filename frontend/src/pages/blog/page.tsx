import { useEffect, useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, User, Search, X } from "lucide-react"
import { Link } from "react-router-dom"

import placeholder_img from "src/assets/placeholder.png"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { useUrlParams } from "@/hooks/useURLParams"
import { usePagination } from "@/hooks/usePagination"
import { Input } from "@/components/ui/input"
import LoadingComponent from "@/components/common/LoadingComponent"

// Mock blog data
const ALL_BLOG_POSTS = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `Blog Post ${i + 1}: ${["Understanding IVF", "Fertility Tips", "Success Stories", "Health Advice", "Treatment Options"][i % 5]}`,
  excerpt:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.",
  author: ["Dr. Jane Smith", "Dr. John Doe", "Dr. Sarah Wilson"][i % 3],
  date: `${Math.floor(Math.random() * 28) + 1}/${Math.floor(Math.random() * 12) + 1}/2023`,
  image: "",
}))

const POSTS_PER_PAGE = 6

const fetchBlogPosts = async (
  page: number,
  search: string,
): Promise<{
  data: typeof ALL_BLOG_POSTS
  total: number
  totalPages: number
}> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Filter posts based on search and category
  let filteredPosts = ALL_BLOG_POSTS

  if (search) {
    filteredPosts = filteredPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        post.author.toLowerCase().includes(search.toLowerCase()),
    )
  }

  const total = filteredPosts.length
  const totalPages = Math.ceil(total / POSTS_PER_PAGE)
  const startIndex = (page - 1) * POSTS_PER_PAGE
  const data = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE)

  return { data, total, totalPages }
}

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Use URL params hook to manage search and category in URL
  const { updateParams, getParam } = useUrlParams()

  // Initialize state from URL params
  useEffect(() => {
    const urlSearch = getParam("search") || ""
    setSearchTerm(urlSearch)
  }, [getParam])

  // Use pagination hook with dependencies
  const { data, currentPage, totalPages, isLoading, goToPage } = usePagination({
    fetchFn: (page) => fetchBlogPosts(page, searchTerm),
    dependencies: [searchTerm],
    initialPage: Number.parseInt(getParam("page") || "1"),
    onPageChange: (page) => updateParams({ page: page.toString() }),
  })

  // Handle search
  const handleSearch = (value: string) => {
    setSearchTerm(value)
    updateParams({ search: value, page: "1" })
  }

  // Clear search
  const clearSearch = () => {
    setSearchTerm("")
    updateParams({ search: "", page: "1" })
  }

  // Pagination function for your existing pagination component
  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      goToPage(pageNumber)
      // Scroll to top when changing pages
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-slate-50 py-16 md:py-24 outer-container">
        <div className="max-container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Blog</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Stay informed with the latest news, research, and insights about fertility treatments, reproductive
              health, and patient stories.
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 pr-10"
                />
                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 md:py-24 outer-container">
        <div className="max-container mx-auto px-4">
            {/* Search Results Info */}
            <div className="mb-8 text-center">
                <p className="text-muted-foreground">
                Found {data?.total || 0} article(s)
                {searchTerm && ` for "${searchTerm}"`}
                </p>
            </div>

            <LoadingComponent isLoading={isLoading}>
                <div className="grid md:grid-cols-2 gap-8">
                    {data?.data.map((post) => (
                        <Link to={`/blog/${post.id}`}>
                            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                                <div className="aspect-video overflow-hidden">
                                    <img
                                        src={post.image || placeholder_img}
                                        alt={post.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <CardHeader>
                                    <CardTitle className="text-xl">
                                    <p className="hover:text-blue-600 transition-colors">
                                        {post.title}
                                    </p>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                                </CardContent>
                                <CardFooter className="flex justify-between text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <User className="w-4 h-4" />
                                        <span>{post.author}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        <span>{post.date}</span>
                                    </div>
                                </CardFooter>
                            </Card>
                        </Link>
                    ))}
                </div>
            </LoadingComponent>

            {/* Pagination*/}
            {totalPages > 1 && (
            <Pagination className="my-16">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            aria-disabled={currentPage === 1 || isLoading}
                            onClick={() => paginate(currentPage - 1)}
                        />
                    </PaginationItem>
                    {Array.from({ length: totalPages }, (_, i) => {
                        const pageNumber = i + 1

                        // Show first page, last page, current page, and one page before and after current
                        if (
                            pageNumber === 1 ||
                            pageNumber === totalPages ||
                            (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                        ) {
                        return (
                            <PaginationItem key={pageNumber} className="cursor-pointer">
                                <PaginationLink
                                    size="sm"
                                    onClick={() => paginate(pageNumber)}
                                    isActive={pageNumber === currentPage}
                                    aria-disabled={isLoading}
                                >
                                    {pageNumber}
                                </PaginationLink>
                            </PaginationItem>
                        )
                        }

                        // Show ellipsis for gaps
                        if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
                        return (
                            <PaginationItem key={`ellipsis-${pageNumber}`}>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )
                        }

                        return null
                    })}
                    <PaginationItem>
                        <PaginationNext
                            aria-disabled={currentPage === totalPages || isLoading}
                            onClick={() => paginate(currentPage + 1)}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
            )}
        </div>
      </section>
    </div>
  )
}