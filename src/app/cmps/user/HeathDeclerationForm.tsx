'use client'
import { getUrl, makeId, scrollUp } from '@/app/utils/util'
import html2canvas from "html2canvas"
import { jsPDF } from 'jspdf'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { callUserMsg, hideUserMsg } from '@/app/store/features/msgSlice'
import { useDispatch } from 'react-redux'

type HeathDeclerationFormProps = {
    userId: string
}

export default function HeathDeclerationForm({ userId }: HeathDeclerationFormProps) {

    const medicalHistory = ['לחץ דם', 'סוכרת', 'כאבי ראש, סחרחורות, חולשה', 'אסטמה או בעיות נשימה', 'בעיות בשיווי המשקל', 'בעיות צוואר, עורף וכתפיים', 'בעיות במפרקים', 'בעיות בעמוד השדרה פריצות דיסק, עקמת ', 'בעיות עיכול', 'בעיות אוזניים', 'בעיות אוזניים', 'גלאוקומה או בעיות עיניים אחרות', 'מחלה כרונית כלשהי פעילה או רדומה', 'ניתוחים כירורגיים', 'מעשן?', 'בריחת סידן/אוסטאופורוזיס', 'אחר']
    const [selectedRadioBtn, setSelectedRadioBtn] = useState<string>('לא')
    const [isPregnant] = useState([
        { id: makeId(), label: 'לא' },
        { id: makeId(), label: 'כן' },
    ])

    const canvasContainerRef = useRef(null);
    const canvasRef = useRef(null);
    const pdfRef = useRef()
    const [canvas, setCanvas] = useState(null);
    const [gCtx, setGCtx] = useState(null);
    const [isDrawing, setIsDrawing] = useState(false);

    const formData = new FormData();

    const router = useRouter()
    const dispatch = useDispatch()

    const handleIsPregnant = (ev: React.ChangeEvent<HTMLInputElement>, label: string) => {
        setSelectedRadioBtn(label)
    }

    useEffect(() => {
        // Canvas setup
        if (canvasRef.current) setCanvas(canvasRef.current);
        if (canvas) {
            const ctx = canvas.getContext('2d');
            setGCtx(ctx);

        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        scrollUp()
        return () => window.removeEventListener('resize', resizeCanvas);
    }, [canvas]);
    useEffect(() => {
        const preventScroll = (e) => {
            e.preventDefault();
        };
    
        const canvas = canvasRef.current;
        canvas.addEventListener('touchmove', preventScroll, { passive: false });
    
        return () => {
            canvas.removeEventListener('touchmove', preventScroll);
        };
    }, []);
    const resizeCanvas = () => {
        if (canvas && canvasContainerRef.current) {
            canvas.width = canvasContainerRef.current.offsetWidth;
            canvas.height = canvasContainerRef.current.offsetHeight;
        }
    };
    const uploadPdfToS3 = async () => {
        try {
            const url = getUrl('s3/uploadPdf')
            const res = await fetch(url, {
                method: 'POST',
                body: formData
            })
            if (!res.ok) {
                scrollUp()
                let txt = `הייתה בעיה עם שליחת הטופס נסה שוב מאוחר יותר`
                dispatch(callUserMsg({ msg: txt, isSucsses: false }))
            } else {
                scrollUp()
                let txt = `טופס הצהרת בריאות נשלח ונקלט בהצלחה!`
                dispatch(callUserMsg({ msg: txt, isSucsses: true }))
                const url = getUrl('user/updateHealthDeclration')
                let healthDeclaration = `https://yayayoga.s3.eu-north-1.amazonaws.com/Health_Declerations/${userId}.pdf`
                const res = await fetch(url, {
                    method: 'PUT',
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({ _id: userId, healthDeclaration })
                })
                if (res.ok) {
                    console.log('user health Declaration created successfuly');

                }

            }
            setTimeout(() => {
                dispatch(hideUserMsg())
                router.replace('/')
            }, 3500);

        } catch (err) {
            console.log('had an error uploding file', err);

        }
    }

    const makePdf = (e: any) => {
        e.preventDefault()
        const input = pdfRef.current
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png')
            const pdf = new jsPDF('p', 'mm', 'a4', true)
            const pdfWidth = pdf.internal.pageSize.getWidth()
            const pdfHeight = pdf.internal.pageSize.getHeight()
            const imgWidth = canvas.width
            const imgHeight = canvas.height

            // Calculate ratio and scale the image to fit within the page
            const widthRatio = pdfWidth / imgWidth
            const heightRatio = pdfHeight / imgHeight
            const ratio = Math.min(widthRatio, heightRatio)  // Use the smaller ratio to fit the page

            // Adjust the dimensions based on the calculated ratio
            const imgScaledWidth = imgWidth * ratio
            const imgScaledHeight = imgHeight * ratio

            // Center the image if there's any empty space left
            const imgX = (pdfWidth - imgScaledWidth) / 2
            const imgY = (pdfHeight - imgScaledHeight) / 2

            // Add the image to the PDF at the calculated position
            pdf.addImage(imgData, 'PNG', imgX, imgY, imgScaledWidth, imgScaledHeight);

            const pdfBlob = pdf.output('blob')
            formData.append("file", pdfBlob, `${userId}.pdf`);

            uploadPdfToS3()
            // pdf.save(`Health_Decleration_${userId}.pdf`);
        })
    }

    const startDrawing = (e) => {
        const { offsetX, offsetY } = getEventCoordinates(e);
        setIsDrawing(true);
        gCtx.beginPath();
        gCtx.moveTo(offsetX, offsetY);
    };

    const draw = (e) => {
        if (!isDrawing) return;
        const { offsetX, offsetY } = getEventCoordinates(e);
        gCtx.lineTo(offsetX, offsetY);
        gCtx.strokeStyle = 'black';
        gCtx.lineWidth = 2.7;
        gCtx.stroke();
    };

    const endDrawing = () => {
        setIsDrawing(false);
        gCtx.closePath();
    };
    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    };
    const getEventCoordinates = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();

        if (e.nativeEvent.type.startsWith('mouse')) {
            return {
                offsetX: e.nativeEvent.offsetX,
                offsetY: e.nativeEvent.offsetY,
            };
        } else if (e.nativeEvent.type.startsWith('touch')) {
            const touch = e.nativeEvent.touches[0];
            return {
                offsetX: touch.clientX - rect.left,
                offsetY: touch.clientY - rect.top,
            };
        }

        return { offsetX: 0, offsetY: 0 };
    };

    return (
        <main ref={pdfRef} className='health-decleration-form-container gc2'>
            <h1 className='tac mb-1'>Yaya Yoga</h1>
            <p className='tac gc2 mb-1'>טופס הצהרת בריאות לתלמידי יוגה - סטודיו קדם </p>
            <p></p>
            <form className='flex-col health-decleration-form'

                onSubmit={makePdf}>

                <label className='input-label'>שם מלא:  </label>

                <input type='text' className='form-txt-input' />

                <label className='input-label'> גיל:   </label>

                <input type='text' className='form-txt-input' />

                <label className='input-label'> מספר טלפון: </label>

                <input type='text' className='form-txt-input' />

                <label className='input-label'> כתובת:  </label>

                <input type='text' className='form-txt-input' />


                <label style={{ letterSpacing: '.1em' }} className='mb-1'>

                    אנא  ידע/י  את  המורה  בהיסטוריה  הרפואית  הבסיסית  שלך.  סמן V היכן  שקיימת  בעיה  בהווה  או  הייתה  קיימת  בעבר:

                </label>
                {medicalHistory.map((option, index) => (
                    <div style={option === 'אחר' ? { direction: 'ltr', marginLeft: 'auto' } : {}}
                        className='flex-ac gap05 '
                        key={index}>

                        <input
                            className='pointer'
                            style={option === 'אחר' ? { display: 'none' } : {}}
                            type="checkbox"
                            name={option}
                        />
                        {option === 'אחר' &&
                            <input type='text' className='form-txt-input' />
                        }
                        {option}

                    </div>
                ))}

                <fieldset className='  mb-1'>
                    <legend><span className='underline bold'>לנשים</span> האם את בהריון ?</legend>
                    <section className='yes-no-radio-btns-container flex-col gap05'>
                        {isPregnant.map(btn =>
                            <div key={btn.id} className={`is-pregnant`} >
                                <input
                                    onChange={(ev) => handleIsPregnant(ev, btn.label)}
                                    type="radio"
                                    checked={btn.label === selectedRadioBtn}
                                    name="repeat-btn"
                                    value={btn.label}
                                />
                                {btn.label}
                            </div>
                        )}
                    </section>

                    {selectedRadioBtn === 'כן' ?
                        <div className='flex-col gap05'  >
                            <label > במידה וכן, האם סובלת מלחץ דם גבוה/נמוך, דופק מואץ, סכרת הריונית, אי ספיקת צוואר רחם, סימפיזיולוזיס?
                            </label>
                            <input type='text' className='form-txt-input' />
                            <div className='flex-col'>
                                <label >כמה לידות עברת?</label>
                                <input type='text' className='form-txt-input' />
                            </div>
                        </div>
                        : ''}
                    <div className='flex-col'>
                        האם יש בעיות במחזור החודשי ?
                        <input type='text' className='form-txt-input' />
                    </div>
                </fieldset>

                <h2 className='tac underline'>חתימה</h2>
                <div
                    style={{ width: '100%', height: '100px' }}
                    ref={canvasContainerRef} className='canvas-container mb-1'>
                    <div className='trash-continer pointer' title='נקה' onClick={clearCanvas}>X</div>
                    <canvas
                        ref={canvasRef}
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={endDrawing}
                        onMouseLeave={endDrawing}
                        onTouchStart={(e) => { e.preventDefault(); startDrawing(e); }}
                        onTouchMove={(e) => { e.preventDefault(); draw(e); }}
                        onTouchEnd={(e) => { e.preventDefault(); endDrawing(); }}

                        style={{ display: 'block' }}
                    />
                </div>
                <button type='submit' className='form-btn'>שלח טופס</button>
            </form>
        </main>
    )
}