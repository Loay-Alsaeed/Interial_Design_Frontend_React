import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FaTrash } from 'react-icons/fa';

export default function DesignDetailsForm({ designId, onBack, onNext }) {
  const { token } = useAuth();

  // State - Consideration
  const [considerations, setConsiderations] = useState([]);
  const [currentConsideration, setCurrentConsideration] = useState({ title: '', description: '' });
  const [considerationErrors, setConsiderationErrors] = useState('');
  const [isSubmittingConsideration, setIsSubmittingConsideration] = useState(false);

  // State - Description
  const [descriptions, setDescriptions] = useState([]);
  const [currentDescription, setCurrentDescription] = useState({ content: '' });
  const [descriptionErrors, setDescriptionErrors] = useState('');
  const [isSubmittingDescription, setIsSubmittingDescription] = useState(false);

  // State - Concept
  const [concepts, setConcepts] = useState([]);
  const [currentConcept, setCurrentConcept] = useState({ concept: '' });
  const [conceptErrors, setConceptErrors] = useState('');
  const [isSubmittingConcept, setIsSubmittingConcept] = useState(false);

  const baseURL = import.meta.env.VITE_BASE_URL;

  // Handlers - Consideration
  const handleAddConsideration = () => {
    const { title, description } = currentConsideration;
    if (!title || !description) {
      setConsiderationErrors('يرجى تعبئة العنوان والوصف');
      return;
    }
    setConsiderations([...considerations, currentConsideration]);
    setCurrentConsideration({ title: '', description: '' });
    setConsiderationErrors('');
  };

  const handleSubmitConsiderations = async () => {
    if (considerations.length === 0) {
      setConsiderationErrors('يرجى إضافة اعتبار واحد على الأقل');
      return;
    }

    setIsSubmittingConsideration(true);
    try {
      for (const item of considerations) {
        await fetch(`${baseURL}/api/consideration`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ...item, designId }),
        });
      }
    } catch (error) {
      setConsiderationErrors('فشل في إرسال البيانات');
        console.error('Error submitting considerations:', error);
    } finally {
      setIsSubmittingConsideration(false);
    }
  };

  // Handlers - Description
  const handleAddDescription = () => {
    const { content } = currentDescription;
    if (!content) {
      setDescriptionErrors('يرجى إدخال الوصف');
      return;
    }
    setDescriptions([...descriptions, currentDescription]);
    setCurrentDescription({ content: '' });
    setDescriptionErrors('');
  };

  const handleSubmitDescriptions = async () => {
    if (descriptions.length === 0) {
      setDescriptionErrors('أضف وصف واحد على الأقل');
      return;
    }

    setIsSubmittingDescription(true);
    try {
      for (const desc of descriptions) {
        await fetch(`${baseURL}/api/description`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ designId, content: desc.content }),
        });
      }
    } catch (error) {
        console.error('Error submitting descriptions:', error);
      setDescriptionErrors('فشل في إرسال الوصف');
    } finally {
      setIsSubmittingDescription(false);
    }
  };

    // Handlers - Concept
    const handleAddConcept = () => {
    const { concept } = currentConcept;
    if (!concept) {
      setConceptErrors('يرجى إدخال المفهوم');
      return;
    }
    setConcepts([...concepts, currentConcept]);
    setCurrentConcept({ concept: '' });
    setConceptErrors('');
    }

    const handleSubmitConcepts = async () => {
    if (concepts.length === 0) {
      setConceptErrors('أضف مفهوم واحد على الأقل');
      return;
    }
    setIsSubmittingConcept(true);
    try {
      for (const item of concepts) {
        await fetch(`${baseURL}/api/DesignConcept`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ concept: item.concept, designId }),
        });
      }
    } catch (error) {
      setConceptErrors('فشل في إرسال المفهوم');
      console.error('Error submitting concepts:', error);
    } finally {
      setIsSubmittingConcept(false);
    }
    }

    const handleFinish = () => {
        handleSubmitConsiderations();
        handleSubmitDescriptions(); 
        handleSubmitConcepts();


        onNext(considerations, descriptions, concepts);
    }

  return (
    <div className="space-y-10">
      {/* Consideration Section */}
      <section>
        <h2 className="text-xl font-bold mb-4">Consideration</h2>
        <input
          type="text"
          name="title"
          placeholder="عنوان الاعتبار"
          value={currentConsideration.title}
          onChange={(e) => setCurrentConsideration({ ...currentConsideration, title: e.target.value })}
          className="w-full border p-2 mb-2 rounded"
        />
        <textarea
          name="description"
          placeholder="وصف الاعتبار"
          value={currentConsideration.description}
          onChange={(e) => setCurrentConsideration({ ...currentConsideration, description: e.target.value })}
          className="w-full border p-2 mb-2 rounded"
        ></textarea>
        <button onClick={handleAddConsideration} className="bg-blue-600 text-white px-4 py-2 rounded">
          إضافة
        </button>
        <button
        //   onClick={handleSubmitConsiderations}
          className="ml-2 bg-green-600 text-white px-4 py-2 rounded"
          disabled={isSubmittingConsideration}
        >
          {isSubmittingConsideration ? 'جاري الإرسال...' : 'إرسال'}
        </button>
        {considerationErrors && <p className="text-red-500">{considerationErrors}</p>}
        <ul className="mt-4 space-y-2">
          {considerations.map((c, i) => (
            <li key={i} className="flex justify-between items-center bg-gray-100 p-2 rounded">
              <span>{c.title} - {c.description}</span>
              <button onClick={() => setConsiderations(considerations.filter((_, idx) => idx !== i))}>
                <FaTrash className="text-red-500" />
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Description Section */}
      <section>
        <h2 className="text-xl font-bold mb-4">Description</h2>
        <textarea
          name="content"
          placeholder="أدخل وصفاً"
          value={currentDescription.content}
          onChange={(e) => setCurrentDescription({ ...currentDescription, content: e.target.value })}
          className="w-full border p-2 mb-2 rounded"
        ></textarea>
        <button onClick={handleAddDescription} className="bg-blue-600 text-white px-4 py-2 rounded">
          إضافة وصف
        </button>
        <button
        //   onClick={handleSubmitDescriptions}
          className="ml-2 bg-green-600 text-white px-4 py-2 rounded"
          disabled={isSubmittingDescription}
        >
          {isSubmittingDescription ? 'جاري الإرسال...' : 'إرسال'}
        </button>
        {descriptionErrors && <p className="text-red-500">{descriptionErrors}</p>}
        <ul className="mt-4 space-y-2">
          {descriptions.map((d, i) => (
            <li key={i} className="flex justify-between items-center bg-gray-100 p-2 rounded">
              <span>{d.content}</span>
              <button onClick={() => setDescriptions(descriptions.filter((_, idx) => idx !== i))}>
                <FaTrash className="text-red-500" />
              </button>
            </li>
          ))}
        </ul>
      </section>

        {/* Concept Section */}
        <section>
        <h2 className="text-xl font-bold mb-4">Concept</h2>
        <input
            type="text"
            name="concept"
            placeholder="أدخل المفهوم"
            value={currentConcept.concept}
            onChange={(e) => setCurrentConcept({ ...currentConcept, concept: e.target.value })}
            className="w-full border p-2 mb-2 rounded"
        />
        <button onClick={handleAddConcept} className="bg-blue-600 text-white px-4 py-2 rounded">
          إضافة مفهوم
        </button>
        <button
        //   onClick={}
          className="ml-2 bg-green-600 text-white px-4 py-2 rounded"
          disabled={isSubmittingConcept}
        >
          {isSubmittingConcept ? 'جاري الإرسال...' : 'إرسال'}
        </button>
        {conceptErrors && <p className="text-red-500">{conceptErrors}</p>}
        <ul className="mt-4 space-y-2">
          {concepts.map((c, i) => (
            <li key={i} className="flex justify-between items-center bg-gray-100 p-2 rounded">
              <span>{c.concept}</span>
              <button onClick={() => setConcepts(concepts.filter((_, idx) => idx !== i))}>
                <FaTrash className="text-red-500" />
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <button onClick={onBack} className="bg-gray-400 text-white px-4 py-2 rounded">
          العودة
        </button>
        <button onClick={handleFinish} className="bg-blue-700 text-white px-4 py-2 rounded">
          إنهاء
        </button>
      </div>
    </div>
  );
}
