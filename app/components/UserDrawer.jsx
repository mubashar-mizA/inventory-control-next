"use client"
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    Button,
    useDisclosure,
} from "@heroui/react";

export default function UserDrawer({ drawerName }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <div className="">

                <Button onPress={onOpen}>{drawerName}</Button>

                <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>

                    <DrawerContent className="bg-black text-white h-screen right-0 p-5">
                        {(onClose) => (
                            <>
                                <DrawerHeader className="flex flex-col gap-1">Drawer Title</DrawerHeader>
                                <DrawerBody>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non
                                        risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor
                                        quam.
                                    </p>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non
                                        risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor
                                        quam.
                                    </p>
                                    <p>
                                        Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit dolor
                                        adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. Velit duis sit
                                        officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                                        nisi consectetur esse laborum eiusmod pariatur proident Lorem eiusmod et. Culpa
                                        deserunt nostrud ad veniam.
                                    </p>
                                </DrawerBody>
                                <DrawerFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" onPress={onClose}>
                                        Action
                                    </Button>
                                </DrawerFooter>
                            </>
                        )}
                    </DrawerContent>
                </Drawer>
            </div>
        </>
    );
}
