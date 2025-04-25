import { Accordion, AccordionItem } from "@heroui/react";
import { ChevronRight, ChevronDown } from "lucide-react"; // Arrow icons
import { useState } from "react";

export default function MyAccordion({ mainTitle, items = [] }) {

    const [isOpen, setIsOpen] = useState(false);

    const [down, setDown] = useState(false)

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <Accordion selectionMode="multiple">

            <AccordionItem
                indicator={down ? <ChevronDown /> : <ChevronRight />}
                onPress={() => {
                    setDown(preVal => !preVal)
                }}
                key="main"
                aria-label={mainTitle}
                title={mainTitle} // Title of the Accordion
                onChange={toggleAccordion} // To toggle isOpen state
            >



                {/* Accordion Content */}
                <ul className="space-y-2 p-2">
                    {items.map((item, index) => (
                        <li key={index} className="cursor-pointer hover:underline">
                            {item}
                        </li>
                    ))}
                </ul>
            </AccordionItem>
        </Accordion>
    );
}
