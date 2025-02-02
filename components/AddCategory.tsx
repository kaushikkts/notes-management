'use client';

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import {Input} from "@/components/ui/input";
import React, {useState} from "react";
import {getStorageDocument, updateDocumentCategory} from "@/lib/actions/room.actions";
import Loader from "@/components/Loader";

const AddCategory = ({metadata, roomId}: {metadata: RoomMetadata, roomId: string}) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [gettingOpenAISuggestions, setGettingOpenAISuggestions] = useState(false);
    const [newCategory, setNewCategory] = useState('');
    const [suggestions, setSuggestions] = useState('');
    const getSuggestions = async () => {
        setGettingOpenAISuggestions(true);
        const document = await getStorageDocument(roomId);
        try {
            const response = await fetch(`/api/openapi?title=${metadata.title}&content=${document?.root}`, {method: 'GET', headers: {'Content-Type': 'application/json'}});
            const suggestions = await response.json();
            setSuggestions(suggestions);
            setGettingOpenAISuggestions(false);
        } catch (e) {
            setGettingOpenAISuggestions(false);
        }
    }

    const updateCategory = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        setLoading(true);
        try {
            const updatedDocumentCategory = await updateDocumentCategory(roomId, newCategory);

            if(!updatedDocumentCategory) {
                setNewCategory(metadata.category);
            }
            setLoading(false);
            setOpen(false);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Button className="min-w-9 rounded-xl bg-transparent p-2 transition-all">
                                    <Image src={"/assets/icons/edit.svg"} width={20} height={20} alt={"Edit Category"}/>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Edit Category</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit Category</DialogTitle>
                        <DialogDescription>
                            <div className="flex flex-col">
                                <p>Choose a category for your note.</p>
                                <p>
                                    You can also suggest a category by writing it down and clicking &quot;Suggest&quot;.
                                </p>
                                <div className="flex mt-4">
                                    <Button onClick={getSuggestions} className="text-sm">
                                        {gettingOpenAISuggestions ? <Loader/>: 'Suggest'}
                                    </Button>
                                </div>
                                <div className="font-bold text-xs mt-4">
                                    {suggestions ? suggestions : 'Suggestions will be displayed here'}
                                </div>
                            </div>


                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Input
                                id="category"
                                defaultValue={metadata.category}
                                className="col-span-3"
                                onChange={(event) => setNewCategory(event.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={updateCategory}>{loading ? "Saving Category..." : "Save"}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </>
    );
}

export default AddCategory;