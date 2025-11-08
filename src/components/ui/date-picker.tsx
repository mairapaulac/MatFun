"use client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { SelectSingleEventHandler } from "react-day-picker";
export interface DatePickerProps
	extends React.ComponentProps<typeof PopoverTrigger> {
	date?: Date;
	setDate: SelectSingleEventHandler;
}
const DatePicker = React.forwardRef<
	React.ElementRef<typeof PopoverTrigger>,
	DatePickerProps
>(({ className, date, setDate }, ref) => {
	return (
		<Popover>
				<PopoverTrigger asChild ref={ref}>
							<Button
								variant={"outline"}
								className={cn(
									"w-full justify-start text-left font-normal bg-white",
									!date && "text-muted-foreground",
									className
								)}>
								<CalendarIcon className="mr-2 h-4 w-4" />
								{date ? (
									format(date, "PPP", { locale: ptBR })
								) : (
									<span>Selecione uma data</span>
								)}
							</Button>
						</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar
					mode="single"
					selected={date}
					onSelect={setDate}
					initialFocus
					locale={ptBR}
					captionLayout="dropdown"
					fromYear={new Date().getFullYear() - 80}
					toYear={new Date().getFullYear() - 6}
				/>
			</PopoverContent>
		</Popover>
	);
});
DatePicker.displayName = "DatePicker";
export default DatePicker;

