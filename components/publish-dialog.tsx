import Logo from './logo'
import { publish } from '@/app/actions/publish'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Copy } from 'lucide-react'
import { useEffect, useState } from 'react'

export function PublishDialog({
  url,
  sbxId,
  apiKey,
}: {
  url: string
  sbxId: string
  apiKey: string | undefined
}) {
  const [publishedURL, setPublishedURL] = useState<string | null>(null)
  useEffect(() => {
    setPublishedURL(null)
  }, [url])

  async function publishURL() {
    const { url: publishedURL } = await publish(url, sbxId, apiKey)
    setPublishedURL(publishedURL)
  }

  function copy(content: string) {
    navigator.clipboard.writeText(content)
    alert('Copied to clipboard')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default">
          <Logo style="e2b" width={16} height={16} className="mr-2" />
          Publish
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-4 w-80 flex flex-col gap-2">
        <div className="text-sm font-semibold">Publish to E2B</div>
        <div className="text-sm text-muted-foreground">
          Publishing the fragment will make it publicly available to others via
          link, hosted on E2B.
        </div>
        <div className="flex flex-col gap-2">
          {publishedURL && (
            <div className="flex items-center gap-2">
              <Input value={publishedURL} readOnly />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => copy(publishedURL)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          )}
          <Button
            variant="default"
            onClick={publishURL}
            disabled={publishedURL !== null}
          >
            {publishedURL ? 'Published' : 'Confirm and publish'}
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
