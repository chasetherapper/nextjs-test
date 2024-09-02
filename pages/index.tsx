import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, MessageSquare } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function Component() {
    const [file, setFile] = useState<File | null>(null)
    const [isUploaded, setIsUploaded] = useState(false)
    const [status, setStatus] = useState('')

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0])
            setIsUploaded(false)
            setStatus('')
        }
    }

    const handleUploadAndChat = async () => {
        if (file) {
            setStatus('Uploading PDF and preparing for RAG...')

            // Simulating the upload and RAG process
            await new Promise(resolve => setTimeout(resolve, 2000))

            setIsUploaded(true)
            setStatus('PDF uploaded and processed. Ready for chat!')

            // Here you would implement the actual upload and RAG preparation
            console.log('Uploaded and processed file:', file.name)

            // Reset file state after upload
            setFile(null)
        }
    }

    return (
        <div className="flex flex-col md:flex-row w-full min-h-screen">
            {/* Left side - PDF Upload */}
            <div className="w-full md:w-1/2 p-4 bg-background border-r">
                <Card>
                    <CardHeader>
                        <CardTitle>Upload PDF for RAG</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="pdf">PDF File</Label>
                                <Input
                                    id="pdf"
                                    type="file"
                                    accept=".pdf"
                                    onChange={handleFileChange}
                                    disabled={isUploaded}
                                />
                            </div>
                            {status && (
                                <Alert>
                                    <AlertDescription>{status}</AlertDescription>
                                </Alert>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Right side - Upload and Chat Button */}
            <div className="w-full md:w-1/2 p-4 bg-background flex items-center justify-center">
                <Button
                    onClick={handleUploadAndChat}
                    disabled={!file || isUploaded}
                    size="lg"
                    className="w-64 h-16 text-lg"
                >
                    {isUploaded ? (
                        <>
                            <MessageSquare className="mr-2 h-6 w-6" /> Start Chatting
                        </>
                    ) : (
                        <>
                            <Upload className="mr-2 h-6 w-6" /> Upload and Chat
                        </>
                    )}
                </Button>
            </div>
        </div>
    )
}