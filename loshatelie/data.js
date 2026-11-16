/* بيانات لعبة مبدأ لوشاتيليه — عدّل هذا الملف لإضافة تفاعلات أو تغييرها.
   type: "gas" (غازي) أو "solution" (محلول)
   heatEffect: "exothermic" (طارد للحرارة) أو "endothermic" (ماصّ للحرارة)
   amount: عدد المولات في المعادلة الموزونة (يُرسم كجسيمات). */
window.OTWO_DATA = {
  reactions: [
    { name: 'N₂ + 3H₂ ⇌ 2NH₃', type: 'gas', heatEffect: 'exothermic',
      reactants: [{ name: 'N₂', amount: 1 }, { name: 'H₂', amount: 3 }], products: [{ name: 'NH₃', amount: 2 }] },
    { name: '2SO₂ + O₂ ⇌ 2SO₃', type: 'gas', heatEffect: 'exothermic',
      reactants: [{ name: 'SO₂', amount: 2 }, { name: 'O₂', amount: 1 }], products: [{ name: 'SO₃', amount: 2 }] },
    { name: 'N₂O₄ ⇌ 2NO₂', type: 'gas', heatEffect: 'endothermic',
      reactants: [{ name: 'N₂O₄', amount: 1 }], products: [{ name: 'NO₂', amount: 2 }] },
    { name: 'H₂ + I₂ ⇌ 2HI', type: 'gas', heatEffect: 'exothermic',
      reactants: [{ name: 'H₂', amount: 1 }, { name: 'I₂', amount: 1 }], products: [{ name: 'HI', amount: 2 }] },
    { name: 'PCl₅ ⇌ PCl₃ + Cl₂', type: 'gas', heatEffect: 'endothermic',
      reactants: [{ name: 'PCl₅', amount: 1 }], products: [{ name: 'PCl₃', amount: 1 }, { name: 'Cl₂', amount: 1 }] },
    { name: 'Fe³⁺ + SCN⁻ ⇌ FeSCN²⁺', type: 'solution', heatEffect: 'exothermic',
      reactants: [{ name: 'Fe³⁺', amount: 1 }, { name: 'SCN⁻', amount: 1 }], products: [{ name: 'FeSCN²⁺', amount: 1 }] },
  ],
};
