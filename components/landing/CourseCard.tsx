import { cn } from "@/lib/utils";

type CourseCardProps = {
    icon: string;
    name: string;
    level: string;
    description: string;
};

const CourseCard = ({ icon, name, level, description }: CourseCardProps) => {
    return (
        <figure
            className={cn(
                "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4 m-2",
                "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
            )}
        >
            <div className="flex flex-row items-center gap-2">
                <div className="text-3xl">{icon}</div>
                <div className="flex flex-col">
                    <figcaption className="text-sm font-medium dark:text-white">
                        {name}
                    </figcaption>
                    <p className="text-xs font-medium dark:text-white/40">{level}</p>
                </div>
            </div>
            <blockquote className="mt-2 text-sm">{description}</blockquote>
        </figure>
    );
};



export default CourseCard;



