import type { Medicine } from "@shared/schema";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Pill, Clock, AlertCircle, AlertTriangle, Info } from "lucide-react";

interface MedicineInfoProps {
  medicine: Medicine;
}

export function MedicineInfo({ medicine }: MedicineInfoProps) {
  return (
    <div className="space-y-6">
      <div className="border-b border-blue-100 pb-4">
        <h2 className="text-2xl font-bold text-blue-900 mb-2">{medicine.name}</h2>
        <p className="text-gray-600">{medicine.activeIngredient}</p>
      </div>

      <Alert className="bg-yellow-50 border-yellow-200">
        <AlertTriangle className="h-5 w-5 text-yellow-600" />
        <AlertDescription className="text-yellow-800">
          Bu bilgiler yalnızca bilgilendirme amaçlıdır. İlaç kullanımına başlamadan önce mutlaka doktorunuza danışınız.
        </AlertDescription>
      </Alert>

      <Accordion type="single" collapsible className="w-full space-y-2">
        <AccordionItem value="usage" className="border border-blue-100 rounded-lg">
          <AccordionTrigger className="px-4 py-3 hover:bg-blue-50/50">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center">
                <Pill className="h-4 w-4 text-blue-600" />
              </div>
              <span className="font-semibold text-blue-900">Kullanım</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 py-3 text-gray-600 whitespace-pre-line">
            {medicine.usage}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="dosage" className="border border-blue-100 rounded-lg">
          <AccordionTrigger className="px-4 py-3 hover:bg-blue-50/50">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center">
                <Clock className="h-4 w-4 text-blue-600" />
              </div>
              <span className="font-semibold text-blue-900">Dozaj</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 py-3 text-gray-600 whitespace-pre-line">
            {medicine.dosage}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="warnings" className="border border-blue-100 rounded-lg">
          <AccordionTrigger className="px-4 py-3 hover:bg-blue-50/50">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center">
                <AlertTriangle className="h-4 w-4 text-blue-600" />
              </div>
              <span className="font-semibold text-blue-900">Önemli Uyarılar</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 py-3 text-gray-600 whitespace-pre-line">
            {medicine.warnings}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="side-effects" className="border border-blue-100 rounded-lg">
          <AccordionTrigger className="px-4 py-3 hover:bg-blue-50/50">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center">
                <AlertCircle className="h-4 w-4 text-blue-600" />
              </div>
              <span className="font-semibold text-blue-900">Yan Etkiler</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 py-3 text-gray-600 whitespace-pre-line">
            {medicine.sideEffects}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Alert className="bg-blue-50 border-blue-200">
        <Info className="h-5 w-5 text-blue-600" />
        <AlertDescription className="text-blue-800">
          Bu uygulama tıbbi tavsiye yerine geçmez. Her zaman sağlık profesyonellerinin önerilerine uyunuz.
        </AlertDescription>
      </Alert>
    </div>
  );
}