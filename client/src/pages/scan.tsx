import { useState } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { Camera } from "@/components/camera";
import { MedicineInfo } from "@/components/medicine-info";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Medicine } from "@shared/schema";
import { ArrowLeft, Camera as CameraIcon, Image } from "lucide-react";

export default function Scan() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [medicineInfo, setMedicineInfo] = useState<Medicine | null>(null);

  const analyzeImage = useMutation({
    mutationFn: async (imageData: string) => {
      const res = await apiRequest("POST", "/api/analyze", { imageData });
      const data = await res.json();
      return data as Medicine;
    },
    onSuccess: (data) => {
      setMedicineInfo(data);
    },
    onError: (error) => {
      toast({
        title: "Hata",
        description: "İlaç analizi yapılırken bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive",
      });
      console.error("Analysis error:", error);
    },
  });

  const handleCapture = (imageData: string) => {
    setCapturedImage(imageData);
    analyzeImage.mutate(imageData);
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setMedicineInfo(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="max-w-2xl mx-auto">
        <Button
          variant="ghost"
          className="mb-6 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          onClick={() => setLocation("/")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Ana Sayfaya Dön
        </Button>

        <Card className="overflow-hidden border-blue-100 bg-white/80 backdrop-blur">
          {!capturedImage ? (
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <CameraIcon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-blue-900">İlaç Fotoğrafı Çekin</h2>
                  <p className="text-gray-600">İlaç kutusunu net bir şekilde görüntüleyin</p>
                </div>
              </div>
              <Camera onCapture={handleCapture} />
            </div>
          ) : (
            <div className="p-6">
              <div className="mb-6">
                <img
                  src={capturedImage}
                  alt="Çekilen ilaç fotoğrafı"
                  className="w-full rounded-lg shadow-lg"
                />
              </div>

              {analyzeImage.isPending ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">İlaç analiz ediliyor...</p>
                  <p className="text-sm text-gray-500">Yapay zeka görüntüyü işliyor</p>
                </div>
              ) : medicineInfo ? (
                <div className="space-y-6">
                  <MedicineInfo medicine={medicineInfo} />
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={handleRetake}
                  >
                    <CameraIcon className="h-4 w-4 mr-2" />
                    Yeni Fotoğraf Çek
                  </Button>
                </div>
              ) : null}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}