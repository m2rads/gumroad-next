import { Skeleton } from "@/components/ui/skeleton"
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import UploadVideoButton from "@/components/upload-video-button";

export function VideoFallback() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}


export function VideoCardSkeleton() {
    return (
      <Card className="w-[200px] space-y-5 p-4">
        <Skeleton className="rounded-lg">
          <div className="h-24 rounded-lg bg-default-300"></div>
        </Skeleton>
        <div className="space-y-3">
          <Skeleton className="w-3/5 rounded-lg">
            <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-4/5 rounded-lg">
            <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="rounded-lg">  
            <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
          </Skeleton>
        </div>
      </Card>
    );
  }
  
  export function VideoEmptyState() {
    return (
        <>
        <Card className="w-full p-4 sm:p-8 md:p-56 lg:p-32 border-dashed border-2 flex flex-col justify-center items-center text-center">
            <CardHeader className="muted">
            <CardTitle>Video Library</CardTitle>
                <CardDescription>Currrently you have uploaded no videos. Click on Add to begin.</CardDescription>
            </CardHeader>
            <UploadVideoButton />
        </Card>
        </>
    )
}
