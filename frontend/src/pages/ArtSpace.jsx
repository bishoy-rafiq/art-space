import React from 'react';
import { assets } from '../assets/assets';

const ArtSpace = () => {
  return (
    <div
      className="relative bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${assets.bg})` }} // ضع مسار الصورة هنا
    >
      {/* Overlay لتغميق الخلفية */}
      <div className="absolute inset-0 bg-[#00000099] bg-opacity-70"></div>

      {/* محتوى الصفحة */}
      <div className="relative z-10 text-center text-white px-4 mb-4">
        <h1 className="text-4xl font-bold mb-6">فضاء الفن</h1>
        <p className="text-lg mb-8">
          هي منصة تهدف إلى ربط الفنانين، عرض الفن، وخلق جوٍّ يدعم الأعمال الفنية.
        </p>

        <div className='break-words leading-7 mb-4'>
          <h2 className="text-2xl font-semibold mb-4 break-words leading-7">الرؤية</h2>
          <p>
          تطمح منصة "فضاء الفن" إلى أن تصبح الوجهة الرائدة لكل من يقدر الإبداع ويبحث عن التميز، حيث <br /> توفر بيئة تجمع بين الفنانين، الهواة، والمقتنين لإبراز قيمة الفن ودوره في بناء جسور التواصل <br />الثقافي والإنساني.
          </p>
        </div>

        <div className='break-words leading-7 mb-4'>
          <h2 className="text-2xl font-semibold mb-4">الهدف</h2>
          <p>
          تهدف "فضاء الفن" إلى خلق مجتمع فني شامل يتيح للفنانين والهواة عرض أعمالهم والتواصل مع <br /> جمهورهم، مع توفير فرص حقيقية لتسويق إبداعاتهم.
          </p>
        </div>

        <div className='break-words leading-7 mb-4'>
          <h2 className="text-2xl font-semibold mb-4">المؤسسون</h2>
          <p>
          تأسست "فضاء الفن" على يد فريق شغوف بالفن والإبداع:
         <br />
         أحمد السيوفي: فنان تشكيلي يتمتع بخبرة طويلة في تنظيم المعارض، ويؤمن بأهمية التكنولوجيا في تسهيل وصول الفن للجميع.            <br />
            - خالد مصطفى: فنان تشكيلي ومهتم بتطوير الفن الرقمي والمجتمعي

<br />
كريم صالح: مستثمر ثقافي يهدف إلى تحويل الفنون إلى أداة للتواصل الثقافي والمجتمعي.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArtSpace;
