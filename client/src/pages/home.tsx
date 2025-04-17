import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Shield, Clock, FileText } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-blue-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
            İlaç Prospektüs Okuyucu
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Yapay zeka teknolojisi ile ilaç kutularından anında prospektüs bilgisi alın
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="bg-white/50 backdrop-blur border-blue-100">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Camera className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-900">Kolay Kullanım</h3>
                  <p className="text-gray-600">
                    İlacın fotoğrafını çekin veya galeriden seçin
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-900">Hızlı Sonuç</h3>
                  <p className="text-gray-600">
                    Saniyeler içinde detaylı ilaç bilgilerine erişin
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/50 backdrop-blur border-blue-100">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-900">Detaylı Bilgi</h3>
                  <p className="text-gray-600">
                    Kullanım, doz ve yan etki bilgilerini görüntüleyin
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-900">Güvenli</h3>
                  <p className="text-gray-600">
                    Doğru ve güncel ilaç bilgilerine anında erişim
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Link href="/scan" className="block">
          <Button 
            className="w-full py-6 text-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-200"
            size="lg"
          >
            <Camera className="mr-2 h-6 w-6" />
            Taramaya Başla
          </Button>
        </Link>
      </div>
    </div>
  );
}