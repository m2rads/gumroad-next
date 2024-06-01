import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
  

export default function UploadVideoButton() {

    return (
        <>
            {/*
            <Button
                disabled={loading}
                className="text-xs md:text-sm"
                onClick={handleAddVideoClick}
            >
            {loading ? (
              <Icons.spinner className="inline-block w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Plus className="mr-2 h-4 w-4" />
            )}
                Add Video
            </Button> */}
            <Dialog>
                <DialogTrigger asChild>
                <Button
                // disabled={loading}
                className="text-xs md:text-sm"
                // onClick={handleAddVideoClick}
                >
                    Add Video <Plus className="mr-2 ml-1 h-4 w-4" />
                </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px]">
                    <DialogHeader>
                        <DialogTitle>Add a new video</DialogTitle>
                        <DialogDescription>
                            Enter the details of the new workout/training video you want to upload.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                            Attach Video
                            </Label>
                            <Input type="file" id="video" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                            Name
                            </Label>
                            <Input id="name" placeholder="Video title" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                            Description
                            </Label>
                            <Textarea id="username" placeholder="Short description..." className="col-span-3" />
                        </div>
                    </div>
                    <DialogFooter>
                    <Button
                    // disabled={loading}
                    className="text-xs md:text-sm"
                    // onClick={handleAddVideoClick}
                    >
                        Add Video <Plus className="mr-2 ml-1 h-4 w-4" />
                    </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}