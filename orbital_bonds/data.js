/* بيانات لعبة الأفلاك الجزيئية — عدّل هذا الملف لإضافة تحديات.
   bondType: "sigma" (محوري) أو "pi" (جانبي)
   requiredOrbitals: فلكان من: "s" ، "p_axial" (Px) ، "p_lateral" (Py) ، "p_z" (Pz) */
window.OTWO_DATA = {
  challenges: [
    { name: 'جزيء الهيدروجين', moleculeName: 'H₂', bondType: 'sigma', requiredOrbitals: ['s', 's'],
      description: 'كل ذرة هيدروجين تشارك بفلك 1s. تداخل الفلكين رأساً برأس يكوّن رابطة سيجما.' },
    { name: 'كلوريد الهيدروجين', moleculeName: 'HCl', bondType: 'sigma', requiredOrbitals: ['s', 'p_axial'],
      description: 'فلك 1s من الهيدروجين يتداخل محورياً مع فلك 3p من الكلور.' },
    { name: 'جزيء الكلور', moleculeName: 'Cl₂', bondType: 'sigma', requiredOrbitals: ['p_axial', 'p_axial'],
      description: 'فلكا p من ذرتي الكلور يتداخلان رأساً برأس على المحور الواصل بين النواتين.' },
    { name: 'فلوريد الهيدروجين', moleculeName: 'HF', bondType: 'sigma', requiredOrbitals: ['s', 'p_axial'],
      description: 'فلك 1s من الهيدروجين مع فلك 2p من الفلور على المحور نفسه.' },
    { name: 'الرابطة باي في الإيثين', moleculeName: 'C₂H₄ (π)', bondType: 'pi', requiredOrbitals: ['p_lateral', 'p_lateral'],
      description: 'فلكا p متوازيان وعموديان على محور الرابطة يتداخلان جنباً إلى جنب.' },
    { name: 'الرابطة باي الثانية في النيتروجين', moleculeName: 'N₂ (π الثانية)', bondType: 'pi', requiredOrbitals: ['p_z', 'p_z'],
      description: 'في N₂ رابطة سيجما ورابطتا باي. الرابطة باي الثانية من تداخل فلكي Pz جانبياً.' },
  ],
};
