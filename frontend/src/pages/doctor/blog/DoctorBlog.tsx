"use client"

import DoctorLayout from "@/components/doctor/DoctorLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { BookOpen, Search, Plus, Edit, Trash2, Eye, Upload, Save } from "lucide-react"
import { useState } from "react"

interface BlogPost {
  id: string
  title: string
  content: string
  thumbnailUrl: string
  createdDate: string
  status: "draft" | "published" | "archived"
  views: number
}

const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Hiểu về quy trình IVF: Từ A đến Z",
    content: "IVF (In Vitro Fertilization) là một phương pháp hỗ trợ sinh sản hiện đại...",
    thumbnailUrl: "",
    createdDate: "2024-01-15",
    status: "published",
    views: 1250,
  },
  {
    id: "2",
    title: "Chuẩn bị tâm lý cho hành trình điều trị hiếm muộn",
    content: "Hành trình điều trị hiếm muộn không chỉ là thử thách về mặt thể chất...",
    thumbnailUrl: "",
    createdDate: "2024-01-12",
    status: "published",
    views: 890,
  },
  {
    id: "3",
    title: "Dinh dưỡng trong quá trình điều trị IVF",
    content: "Chế độ dinh dưỡng đóng vai trò quan trọng trong việc tăng tỷ lệ thành công...",
    thumbnailUrl: "",
    createdDate: "2024-01-10",
    status: "draft",
    views: 0,
  },
]

export default function DoctorBlog() {
  const [searchTerm, setSearchTerm] = useState("")
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(mockBlogPosts)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    thumbnailUrl: "",
  })

  const breadcrumbs = [{ label: "Trang chủ", path: "/doctor/dashboard" }, { label: "Blog" }]

  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800"
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      case "archived":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "published":
        return "Đã đăng"
      case "draft":
        return "Bản nháp"
      case "archived":
        return "Lưu trữ"
      default:
        return "Không xác định"
    }
  }

  const handleCreatePost = () => {
    if (!newPost.title || !newPost.content) {
      alert("Vui lòng nhập tiêu đề và nội dung bài viết")
      return
    }

    const post: BlogPost = {
      id: Date.now().toString(),
      title: newPost.title,
      content: newPost.content,
      thumbnailUrl: newPost.thumbnailUrl,
      createdDate: new Date().toISOString().split("T")[0],
      status: "draft",
      views: 0,
    }

    setBlogPosts([post, ...blogPosts])
    setNewPost({ title: "", content: "", thumbnailUrl: "" })
    setIsCreateDialogOpen(false)
    alert("Bài viết đã được tạo thành công!")
  }

  const publishPost = (postId: string) => {
    setBlogPosts(blogPosts.map((post) => (post.id === postId ? { ...post, status: "published" as const } : post)))
  }

  const deletePost = (postId: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa bài viết này?")) {
      setBlogPosts(blogPosts.filter((post) => post.id !== postId))
    }
  }

  return (
    <DoctorLayout title="Quản lý Blog" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Search and Create */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Tìm kiếm bài viết
              </CardTitle>
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Viết bài mới
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Tạo bài viết mới</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Tiêu đề bài viết</Label>
                      <Input
                        id="title"
                        placeholder="Nhập tiêu đề bài viết..."
                        value={newPost.title}
                        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="thumbnail">Ảnh đại diện</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Kéo thả ảnh hoặc click để chọn</p>
                        <p className="text-xs text-gray-400">JPG, PNG (tối đa 5MB)</p>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="content">Nội dung bài viết</Label>
                      <Textarea
                        id="content"
                        placeholder="Viết nội dung bài viết của bạn..."
                        value={newPost.content}
                        onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                        className="min-h-[300px]"
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={handleCreatePost}>
                        <Save className="h-4 w-4 mr-2" />
                        Lưu bản nháp
                      </Button>
                      <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                        Hủy
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Tìm theo tiêu đề, nội dung..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{blogPosts.length}</p>
                  <p className="text-sm text-muted-foreground">Tổng bài viết</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <BookOpen className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{blogPosts.filter((p) => p.status === "published").length}</p>
                  <p className="text-sm text-muted-foreground">Đã đăng</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <BookOpen className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{blogPosts.filter((p) => p.status === "draft").length}</p>
                  <p className="text-sm text-muted-foreground">Bản nháp</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Eye className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{blogPosts.reduce((sum, post) => sum + post.views, 0)}</p>
                  <p className="text-sm text-muted-foreground">Tổng lượt xem</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Blog Posts Table */}
        <Card>
          <CardHeader>
            <CardTitle>Danh sách bài viết ({filteredPosts.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tiêu đề</TableHead>
                    <TableHead>Ngày tạo</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Lượt xem</TableHead>
                    <TableHead className="text-right">Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPosts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{post.title}</div>
                          <div className="text-sm text-muted-foreground line-clamp-2">{post.content}</div>
                        </div>
                      </TableCell>
                      <TableCell>{post.createdDate}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(post.status)}>{getStatusText(post.status)}</Badge>
                      </TableCell>
                      <TableCell>{post.views.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>{post.title}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="flex gap-2">
                                  <Badge className={getStatusColor(post.status)}>{getStatusText(post.status)}</Badge>
                                  <span className="text-sm text-muted-foreground">
                                    {post.createdDate} • {post.views} lượt xem
                                  </span>
                                </div>
                                <div className="prose max-w-none">
                                  <p>{post.content}</p>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>

                          {post.status === "draft" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => publishPost(post.id)}
                              className="text-green-600 hover:text-green-700"
                            >
                              Đăng
                            </Button>
                          )}

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deletePost(post.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DoctorLayout>
  )
}
