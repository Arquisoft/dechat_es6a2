const assert = require("assert");
const Encrypter = require("../src/lib/Services/EncryptionService");

describe("Encryption", function() {

  it("Encrypting and desencrypting with AES", async function() {
    const encrypter = new Encrypter();
	encrypter.setPassword("wololo");
	var txt = "God only knows, men of honor.";
	var enc = encrypter.encryptAES(txt);
	console.log("Encrypted is " + enc);
	var desenc = encrypter.decryptAES(enc, encrypter.key);
    assert.equal(desenc, "God only knows, men of honor.", "The desencryption is not correct:" + desenc);
  });


  it("Encrypting and desencrypting with Enigma; random configuration", async function() {
	var rotors = ["i","ii","iii","iv","v","vi","vii","viii"];
	var reflectors = ["ukw-b","ukw-c","b-thin","c-thin"];
	var greeks = ["beta", "gamma"];
	const encrypter = new Encrypter();


	var enc = encrypter.rotorSchlusselmaschineCodierung("Only love is with us now, Something warm and pure; Find the beast within ourselves, No need for a cure");
	console.log("Encrypted is " + enc);
	assert.equal(encrypter.code.length, 3, "Wrong code length: " + encrypter.code.length);
	assert.notEqual(encrypter.plugboard, null, "It must be an object");
	assert.notEqual(greeks.indexOf(encrypter.greek), -1, "It must be contained within the defined options: " + encrypter.greek);
	assert.notEqual(rotors.indexOf(encrypter.rotor1), -1, "It must be contained within the defined options: " + encrypter.rotor1);
	assert.notEqual(rotors.indexOf(encrypter.rotor2), -1, "It must be contained within the defined options: " + encrypter.rotor2);
	assert.notEqual(rotors.indexOf(encrypter.rotor3), -1, "It must be contained within the defined options: " + encrypter.rotor3);
	assert.notEqual(reflectors.indexOf(encrypter.reflector), -1, "It must be contained within the defined options: " + encrypter.reflector);
	var desenc = encrypter.rotorSchlusselmaschineDekodierung(enc);
	console.log("Desencrypted is " + desenc);
    assert.equal(desenc, "Only love is with us now, Something warm and pure; Find the beast within ourselves, No need for a cure", "The desencryption is not correct:" + desenc);


	var enc = encrypter.rotorSchlusselmaschineCodierung("https://rokivulovic/profile/card#me");
	console.log("Encrypted is " + enc);
	var desenc = encrypter.rotorSchlusselmaschineDekodierung(enc);
	console.log("Desencrypted is " + desenc);
    assert.equal(desenc, "https://rokivulovic/profile/card#me", "The desencryption is not correct:" + desenc);

	var enc = encrypter.rotorSchlusselmaschineCodierung("Un sinfín de catástrofes acontecéran a los injústós");
	console.log("Encrypted is " + enc);
	var desenc = encrypter.rotorSchlusselmaschineDekodierung(enc);
	console.log("Desencrypted is " + desenc);
    assert.equal(desenc, "Un sinfín de catástrofes acontecéran a los injústós", "The desencryption is not correct:" + desenc);

  });

  it("TRUBIA Encryption Algorithm: private", async function() {
    var encrypter = new Encrypter();
	encrypter.setPassword("dsfudsu6743t77gr94");
	var txt = "Memories broken, the truth goes unspoken, i've// even forgotten my name";
	var enc = encrypter.encrypt(txt, false);
	console.log(enc);
	encrypter = new Encrypter();
	encrypter.setPassword("dsfudsu6743t77gr94");
	var dec = encrypter.decrypt(enc, false);
	assert.equal(dec, "Memories broken, the truth goes unspoken, i've// even forgotten my name", "The desencryption is not correct:" + dec);

	var dec = encrypter.decrypt("Texto plano", false);
	assert.equal(dec, "Texto plano", "Should return the same text:" + dec);

	encrypter.setPassword(encrypter.hash("Srpska"));

	//Grupos
	var dec = encrypter.decrypt("b3685ee5a399f635b72d50f94408a4219baa5aab96380875d4f416c0b21bff4c54a0bf76b3c89d404cf81f7350db656dbeb2a807a8d14146316882cab15a40254f7510e29a53d328312659fd9f1c82e29610f335691580e6aa7d530354820fb0306e9223b8d227ee660c5025cc831ccbb7cc8cecaa0a3f2d2b6d54c3af681ef34878be27701fde5b386ec0bb4d30c826bef9f58ac1d643b1c1bf7c26d2ee3f66428024af48ec22be3c91eeba3893644f45f518a865fa08ee3fbf28b3c98e76185415272298e7466bca38f125321cdfda6fa78f02cf43381a3a4306e06d872fa233b738ed4dfac9e56802e508303193d266fff2e7b7a0fcf94b580376ae996984=U2FsdGVkX1/ElRR4W51sATSXyq9dyVXoQ3T1U1KntO+YeShmje5fw2tO5dHtg9am5XolLC9sTKpF+QylXoEsuRsCMNWg4fUkstABQK2mQF4V8jVXkBBHbUXUSYo39QHB/HapUn3YELsID0sRNz4dFgOmq1pYkHW1XsApRG/FZQhzMECLr3F0VFZmZeRsaHwpi86y4f9y5mHIw9bIFQIn3w==", false);
	assert.equal(dec, "https://rokivulovic.solid.community/private/dechat_201904050622.ttl", "Store in :" + dec);

	var dec = encrypter.decrypt("b3685ee5a399f635b72d50f94408a4219baa5aab96380875d4f416c0b21bff4c54a0bf76b3c89d404cf81f7350db656dbeb2a807a8d14146316882cab15a40254f7510e29a53d328312659fd9f1c82e29610f335691580e6aa7d530354820fb0306e9223b8d227ee660c5025cc831ccbb7cc8cecaa0a3f2d2b6d54c3af681ef34878be27701fde5b386ec0bb4d30c826bef9f58ac1d643b1c1bf7c26d2ee3f66428024af48ec22be3c91eeba3893644f45f518a865fa08ee3fbf28b3c98e76185415272298e7466bca38f125321cdfda6fa78f02cf43381a3a4306e06d872fa233b738ed4dfac9e56802e508303193d266fff2e7b7a0fcf94b580376ae996984=U2FsdGVkX19PD2XZxzur+0RiRAGxHBcDOSBGUqa1SzeR+SHwjtD7gqddqHiFu1LZwGdxgVsBmlVdqdGeHAp/WjhnmBHlYCXPO41o5db8Seei/Bm8Y0XQ0R//DShDGupiNU58WTGUmuTzfBnyJm439uisWDnH39RLFkl9Z+l18ohljFb4qYOQ2qAlNh7Ui6hg", false);
	assert.equal(dec, "https://rokivulovic.solid.community/profile/card#me", "Contributor:" + dec);
	//assert.equal(dec, "", "Data:" + dec.substring(0, 50));

  });

  it("TRUBIA EA: images", async function() {
	  var encrypter = new Encrypter();
	  encrypter.setPassword("dsfudsu6743t77gr94");
	  var img = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wgARCAEsASwDAREAAhEBAxEB/8QAGQAAAwEBAQAAAAAAAAAAAAAAAAIDAQQF/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAECAwT/2gAMAwEAAhADEAAAAW581zMpNa5ummCGk6eeQ2RaS3UfIg02XYxMtKJCsOfr0na4IqqanZxxTDYxCuzt08/nzSSe7y9Nm9Mm215Yj0or5i2hlbmdPDEO+1pZevjjm9G9kriT3S3AEt1MlbTMxov58dPGLZlnf368GMcu7PV2F6UtTVtyxHemoMVuc3Uy2nLMu2tyWq88p100GYZjas9a0XZcmxM3ejlhK7fLgjTE7vR18muXVaTq5c59Nz6WW9NmLTYnZwxxejpTKey0ZGqABoJpuTWKtco9FOcXVWqZhmdvl5hsC93o6eJ0spOjnls5zVnrQabI2S1y9um6EjQ0gZq4bGw+cpqpvQYPidPHC6pL08pHbLm/LIEB3+jr4m63PAMjYjZPGkt3i7bNXbSRovyyWQ67JMoUsbJ8RNtXKzLcuvlinM0uwuousgGL6Hfp5cykhbkPmVw1Obrvm66Ypzz0c86KNGoIAQ3Zb1bEfMNGlfFLOfrefWurlno5TZcRdTAsW69Hv08zOZyNGyPlTLl7b5uunk6OWK88pamlcmjYzTNTTbU1pdMk3OWleVbMtI5Omr85fljYLUsnurp6nTp5mcrJkWxKZnL16Q66eTp45bOVpk0ANl1TZ9qb09UGHFMgCJ5iy8OlOWNxMrKhvSb169vnZzPMpmVwlvXF6Nbl1ccPkuo9AALWgtt6bdLCsNjVrDjjmyYuEkMSWIuUo830b9y3z8ZTGb85tvnejbVblK885Y2mVlNa9qD09pq4mLi4MOaKYhculpppWAVKYZm8MdXW8HLK85fDk765u1ridXDK1WRdxTNXKprTar0CGKLgLgxiKYFjWajTWxWSGp1ZdXKyyOri45TEZfO9Oyuvhkktkai1TVru0qtu0hzrzUKKGABiAVkNTGRp0Rxp0s9fGkU287lzznOfvvl67pnPd58atrW2ru23XrYxQVFUqJEisqwesjDKIY1dMTojjOtnsyfFNvN4czE8709DTp456uWb61Xtquj1oAKCgABhlIRJVBZmG2hSHJp0Zc0dVnVmLx0/aefw5JXB6OjHdyzbeq1WqFFEDANUAAADAMMJ1EisqcCcdWUsOjctJnC72cHHnLSffXYdeV9XDmXz7KHqxpoABhoAAAAGGGKE6mRDDM2upVN406uLjzlq7211HSVoMl8uuxOkAAw0AAAAAAAAwFUgkc1ylm5LxrdXJx5w6abvbDnZDiS+fXUXRgAAAAAAAAAAAxUOOQzaU9hzT4qd3Hyxy9a/bTSkOBhx2iVOqOs6U0AAAOdWKpoAAGCryCYNhTZ7DmlzU7OHljl61e2qpWX0Y8W1KFDIYCsnYdR0JoAeO1iVOo6EYDDDmXnjeR8ynRQTjZ85X1ODnjm3Z9t1TYyWdLq4EBtEMMjDnRHWXIHSiHOca3O9AgsDk5rc5ax9nynyTxOj1a87HOFvH36dEPFMFqfSrWGlUCahoRoyOe1JQAOdfLt9iRCFc2U+Tp5R7EREXLE7fTvz8ZXM8/0depO3je7hpLPM9Ej0ZblBoCjAMBST2YsgBzLphCpxz4U5Z6ciJayiZIR2+jp5eZblnk9O729HGU56vi8PaQ6lpbVrKDAA0eLJp2R1DRx282NwsfeZx0Zy/LN8s52O8wuXkDv79fLk3niPTU+vS+JblL4tYjpHpV0yp6q0oBQXk9uTymoKJootol0pkmM9HHJCScvXTSUxgO/0dfMkXGdXh9HR0tyzkdvDLq11HppdM1CktSlUoKCKSsl7nV0EjBmVxivKZlLU4u2+/wA+cF1PQ79POzIyUzOfrqHXdcS3PD4WxHlrNGk+hdTNEVdVIJctXTKwoVhEB5mslc5blUy4+tVm/KAV2+jp5+YuJuYVw+joW255rjNcR8NNpkbWtoVKXN7Oe9rl3OPuWi0GRsx8ymZXLOcnt5/W9nDABmr3+jp52MmM5K0kt3j77Y6uOK887Gggguq0Otc6tnbWrXnd4mpluVqNk+JTDoynZ5fovVxw2YtCZb6Pfp5Um4myEjRDprk7dKSdXHnXnnKF2QNCKy2m6NYmLDUl0ZqvD5ijZNm0s8r0V+eaZyqUgQO/0dfKTOeaTOybm6c3bfL126dHLN+WMpVIB5Xd3lZVZW88RdK840LZljLl15/fXRzw2Jx99354rnOWx3r1Om+PlzXOdkF2ALV79JbulMw5YMZXeufWr46Xx7CzGWm4b8875krp55fIF1JdN8u9dvHNeeZdL5/fp2cuTpydeqavuyw8/GeYGG0F+u69N0Oe2skYaZrdQObh2pn0T15nzGnqlvhjyKVzAju8vXbydnHLZmGacPfpaZjrU9a092IeblOZKyNp9Xs7dcrnzAY49XsFXlz0v5/TPXPHlpn1a6c/Tw155TWtRbY7VhsTUIyufrc0lalu0HvZQ8/KeYWAHT26PvTRyc8dvTXBiX1a28k3Hn6Lc98fbjfGq53w9uCuXdxcXWdnKz1MRNaaRpnLZ6q6YLaRple3XLw5pnJBY2rTp0RBdTFTMe2WSu2TYDInH2zSc689NGoQujxHdaRpEtzVnWxbJNGjT1OjzcYMSmWpsFCYogpQpINYaCYvN1s1XTs5YeTZcpLYdLXOWjKhrXP0pKxSSmYlvuV//8QAJxAAAgICAQMEAwEBAQAAAAAAAAECEQMSECAhMhMiMTMEMEEjQDT/2gAIAQEAAQUClOW+8jeQ8skevkPXmetMWXI3uzdm8jeR6kz1JHqSNpG8jaRtI2kbSNpG0zeRvIlkyo9bILNMeXIPLlPWyHrZCOSTWzNpGzNpGF3Gf2DkMXMBvhOn0RdqXzxLw/pF9FH9tD+RcY7vnB4T85yKsrs1RtxDhdm3ZZts5r3N9ouo2OV8OacRSoiQ8snl/XJvmuMRHz6MHhln/p/VYlRk7FqhOuIq2opH9ckN2yuu2hOnJ7NknHUTWu3YxupR8+jD45fsihCJRs0PTPSPTFDVyyF9Co9pSOxSPbS1HXQh4z0j0iMdU8fdQqXRg8Mi/wBfjrlKiUnIrjU1ZGBKBqzRlcUascPbozTtqzVik4kZKXQ+nB4ZF/p8lHfiuJ5Duz4FCylXZG19UuFI26XGynFwyX12fj+E/s4QuJzKviEK4s16qZqz0rPQZ6ckaspiHxVko0QnfTYz8b68i/0/nwLjJPmMaLPkross2E2bMWRm6LRRRRRqj0x4ieBpxuq5n2Ez8b65/b88zlR/WQjqN/pXRZfCkz1GbotMooo0iaxNEaEo9n2f4v1ZPP8AsR9lJti7EIjYuijQ1ZoxKv07GxsKQsrPVRtFjdG6FTGkZoI/F+rJ9i4yy7i9z+ElfVYu/Fl9Vl/ol9EWQfckrMCqGTyQ3SdviCpP3PlRsWMWFHpRNEPGSxyHa/bfEv8AzoQu6Zj+J+ZmlxHvKhRaNWKMhRYkV09xqx4oseFjhJfqrh/+dETHxAn5ku8kYoiTFFiTEv2UOKY8MWPCxxkulLl/+eJEXYZAknu7rWRrMjFqKjIVoWRCnH/gocEx4IjwSNJJ8z+lIiIZAl55K0hQkhLhpMljGYp6y/4a4aHBDxGT4QuGQH55LItifePQ4uc4Yox/5pPhcujGPymRXEJ000+G6Fm1cc0H/wAsnQ+FxY2Y/iXlkl3xzRt3s9yFnaJZ3JWWKbiL8mRHPB/onkUCOSMv0NknwuEMZj+H55aFXEHUm46z+eiyyMnEj+RIjmi+nIn6urIylEWZCd9MmSdC5ssZi+H55iPY2GzZ/pssU2iP5EiOaEhySWP3cOCZLCO8ZDP34kxs+SPN9rGzF4y+zIvbwxQY0Vyj2tODPjqRBVHnKrjGLlKK1UmMmIXGxtzg8ZfZJdqIxIxi2SimSjT6LG76kQlcec3jjhqpzSLscki7cUIZZZfGHxn9nYaVwq4dn6ve+0+7oo1/QjSQpOJHOLJFmyJNSlKdux5HxFEVzITvnB4T+1GQU6PU7zlZjn2pMcCuGiiunH5KqzVsWbPojjPbHj+WWZZdoL28YPCfmvmSR8ESDuMfbJMTGrK4fEkUUVxvJF2WfJoj0T0kXGI5NlCRQ+POfODwyK5FbLIuEyXdRdi5pM1KKGiijWxxa6FJo9WQ5NlFCQlzmlRjjS5/G+uf2CGiSppkZU/h8WbGxZ2NUalEVSaTJ4iuqyxDslLVRW8uWfj/AFz+z+Hypq0Ii+uzYT4vh/HSuV8SdEpPJKK1XR+P4T+3mjJC+LIy/QkLl91rwxQbHjNGUIboyZHMjHUsfRg8Mn2V0zhwmRnz8FmxZbNmbs3Y8wsvZTRsjY2N2bDyKKnkeR48epInKyHwWPIfiu8U1/p1OKqmPWJCUWXbY1wuG6E74yI/i4XMsiR3m4QUeJ90RLJSvj8T6Z+fTBNDlIk9YvF6pjwxxksMSMIqKeNGSGOMUuH7nxMrtXMsiQ5tkcbZFJdDXu/kpXz+H9M/PoirbuB8GaQ7jggvTipNThOGR5pQgpZHlmSlSTXN2/kk4xItSMiWsI9kuz7CGfC2bPgb6Pw/pn59EY9o+6TlolBsdJOW8tsRtjxmVwlHGtUSUpShHUsyZLILZ3SqU2uyvZtnuO74Z7pH9cWaM0d+mzVp/i/VN+/nsRyG2z293rTFNjbkP2llnfnuSdtJaxcUNplotsuixuxvsmfJN2Qq72lsrTVp+6Uj8T6sj/1X6q65ofhH5fRN0lFNcy6mfjfX/8QAIREAAwACAgEFAQAAAAAAAAAAAAERECACMFADEiExQBP/2gAIAQMBAT8BbKXas+SsrKyspSs+T5KysrKysrFuylKUQ8TVi3aFhi7nohiWKJ5fQ/voZx3e3EmGM4kxMMuILqhMTEJ0LLGJnuPce49x9iW3yV7XLKe49xSl1XTBLNKNiZSlKUpSlKUhOlD3Sy2XoWJsnidCHsllvqnV9jW6Hql+KEITEJh6LL0Sy/0whOhYe8J5SEJmavC6IT8z1eFh+Cej8E/sXhWLwrF4V+GYvCsWK/BsXgqUQxeApcoYvCIeFm/kSH0PPEeF+Oddw88RjFl5ovyXoQ8p4eH+lD0Q9Fh60pdF2TCHqh6LL6l3vVD1Ty10IWb1vZD2Ty1suIvSZ/Jn8mP02P4LilxSiw3iDzMPdZg1lHD7ENwXK49Tjulh4WGJCWXslrCEx6fHHqcz0vvHq8tYTVYglo9Vtc8eIlDnyhHyZw4xD+Eeo6JEITSDROh6rZYSOKhRqi4wpy5ZuGLteixcUuaceSPee8/oj+p7rrS/vWX+L//EACIRAAICAgMBAAMBAQAAAAAAAAABAhEQMRIgIUADMEETUP/aAAgBAgEBPwFs5HIVlFFDPT0tnp6enpyZ6elstnpbLZ6eixRWKKHZbRzZyZyZEe8JYReJbEhlWaE8bJL0jo8Y0R2UeWSXprKd9bo8JtdI6HsSxZF5ls/mFSGPwicR+sWjifwjH3HGxkyOhCx4X7iZLXWGisMZBFe4ccTdIu2fwUBKixiK6WNEo2KNYUcV6KNDaH6S11hrDHhSo/0P9D/Q/wBLOVkY9fRWenp6ejTFYm8yZzo/0H+Uc7F+Twc76x13vCiJYscjmSmRmczmczkcjmKZyOZzRyscbHGv0x0N9HhekYC8w5HI9ZXZYaKw3hCZslH9EdD6PEY5lLCLL60ULFFFHESzdko9aKF0eIxw2Sl2orKRRRXWiiisSj0iVh9IxzJizRWaKEiv2s4jWFaE7w8Ni9EsSl3ooor9lFFZoaGRfuGPEFiTo3my/nskWMTsexiXosSZrNCRRXztDI6JbxBYk8pFCX1MsRLeIrE2UKIkV9N4eES2RQsVbOKK+p5YyOiRDDF9jFmTIaJ7If8ACZIhonsh9z6NjZDRLZD7nhYYyGiez8f3N4Q2Nln49Etn4/tbwiyTG8Q0SIZscxNfOxllljzHRIWxYmyxMi/mY8WLpHQz+kcTRxsoixMsv4F0Y8R6R0PEXiSESRdCkWWWWX8DG8xRJ5joYyONjVD9RWEyy8X8EhrCNIeY6GPEXhrEuiYniyyyzkKSL/Sx4iiTyiIx4TE8SXWsWWcixsvCkJll5sssciyKG6XRCH0i8yX6nlCZfZ4SsXiJOyuiH1jLGyUf1Vm8uRzOWUhKiTK6x0PtGWZRKzRRXVROJQ7K6KIlRKQvRRJY4ihhsvqiOaJLCRWHisRZ/R9KFE0SleI4YkJZlvtFdqKGN9UWXihREhsbsrCEUJdJb6rLeL6SGJDWEVhJsaogxsvokKPeW+sVmsMRZyJOyhMbKEqJOjZofpoWbKzZyLORyxLfRHI5HI5HIeG+qFQ2STFiksUUUNYQz+FPFCWHiiv3o/uH0XVZY+n/xAAqEAABAgQFBAMBAAMAAAAAAAAAASEQESAxAjAycYFAQVFhEiKRQmJyof/aAAgBAQAGPwJfstzUpqU1KalNSmpTUpqX9NS/pqU1L+mpTUpqX9NSmpTUpqX9NSmpTUpqU1L+mpTUprU1KNjU1qa1Nal1NS/pdS6l1H8i702y1qlRbL5MW41EkrelxiQuWtXJiT3Tav65zQ95PJj3GovC5cnMaiRcYvC8PIxeLqMXLkiaF6eTHuubYcZC0LRtRaLZPJi3r+sfRaDdB7yOTFvVKEh7xeuxpGLVzJLXyYt6ZQY95lhy+RNK+TFvQ0ffQ3LJC9FquTFvGY458umvB0GUeiZyYt4yQclkMvR4aV3F3hPLsWhYfPSjuLuLvCVPc7nfIeDKW6FdzFv0tjwMWyMNK7i7isaf+Glab9C6Id0GLUYKV3MW9bQ9dNcwolFxdzFuIx2O1LHlesXcxb5Fi8usXcXcuXyGUc8ZLL0C7mLcQbLZR3PFKx+zDZq7mLcQsucyjueCZ8vMWhLFmLuYt8v3kpTJMzkxbxdBp9L7yLFi0OTFuXLkpqSJKnQPF7JTNcjkxb0TELwbMatxqZUcmLemS9HcdRsvkxbxnCZNI3zrwvXInRyYt6JQkeqr1zTLcenkXeuS9dyYt6ZpGS9B4pdRj3VyYt6ppF8qxYtW8HvBqeTFvWq/Fy6fkGSLQnkWoaHvI5F3qn8ZkvgT+J8sTCyFxLiU+6uak/Scp+I+oolfgbJ5F3pkf4ohJVliU+Ccn+x81mfLHNTyuxKSTEkyJGU4zg8Z4iaoh7HhNa+Rd6WVy6yQVVWfiCT7E8UJH0Rz3G7wklqJHouOp2Ow9x7QeiRyLvQ40kTYRkkfJmOx2X2sP5/SZ2P5OxZCyQmtDEodiSLB5DKg49i5NVgxyYt+kQSmeSsOT//EACkQAAICAQQBBAICAwEAAAAAAAABESExEEFRYXEggZGh8PGxwTDR4UD/2gAIAQEAAT8hUSkWiz9qfvRR/eOTa8il/uJ06vcqnzi39Jz9iPaJZ/cL/tEgP3h+2F/2tIP/ALZ+7P35+60Q/wDrD3b8n70/6snR8kSY/vRc6WSfzoj9kfvz90MbJvseLY2shpRPBCZv3FuybmUEqkjFlXueEO4ujxkhp2o8nJDUU0Xbyj7RDWVAtx6MQSmadFO5RRlpJSeUxWh0UtAlA8hIKxZeHnYjoRHlNKPRkH3BhXvLOB+VjYyUVGjRI8saBoe0vIoOeBuirREyQ9onEIW672GzljSbVvArVidchiNLcSX4MbP4RsJEm6WkG55RbwNaGKefTkFZqxO5ibbX0LahnBck8HaCBUtyLFJTMEkKFbE4JygkvA9zF9FnkaiiELcilyLPsbymQKfkjGXiQ1jSJLJhieE+I5RhIU7SQBh8+nOPvcDGIqlQxBVkxLkTboK9jiBCVz7JFnguMIEnbfA1uNH4ERyfwfgQrE258ESc/QR3ZohIPaBShU3EDFNKVkhOcDvRPMrJaattMgk/KslIlHwNuKixdHsQJVonzGli3vA4tITPC0ympW2KhF3jdhk07YjoTvZ6CFYV7m40NouL3O4TXDQ9jYUSFqhj0ZB4CREoz5IJwPkq7EroWjY9xZnyJT8jruglQhBRwLYEuLfoeCgnDhaNtyRCHSFs2sjqhCw6CJGRqxZxkyomVNpkzgsLuyiWuORSFqlsRa2h7BS5CQktGQyTY7Q23Pgeyj2N3Tox0Q7EntBKcGNhpRoe0DvemBjxpaTOMjMT/kVUsigs3tptfcTnP2Q4SyIsuw4YsthQ0kkQ6EuEcNfAl8L2Nwj+hOwaJ9nuWxZ4DVi9w2DR7kq6NlAjQasbIg9xM1uS1JnC2rmPY1YuBKMEeGsz2YqpK2QpECkSbzgVKiSdGSJvsSMz4G5JJ0LETsR3+4txgt1NCwl0wGnC+CyYfAyewQWRbZbCON5Q8+8TSXcv/IkrCbjqZQ4baZIrImcvYgE+DfVO90OlMcmx4hP+w4KJGxWIRJTUasN8nRfkTci8C/uItUwsiGTKjRQPuUbyLeRuL9mEMaMwZYjGwsjaCdej0gxoGeWBUtDMuSdG4ESQ9D3gnSS4E5TMkbJBgexEaapkQ7i/OF3FvYZnM+5MK0XPIgRCiNL4OEJZwBI2D4Ql4FsSEZRpirV6v+zc5GLRyE4Phsax6JyWI2PwOj7YVGBRTNoSslFIeTYhcD5n7sby/n0mRyg2STEKPBEo9zKN7D0UD60eXooG5EHRKPnWamM/F4PsNHbmrsRpTEDobglYOG/kT5+RnJHobMkEEEEaMojNofgIZSZRyU8HJv6J5PvCCC8huzH8sIqaeQq3Ds/ISlfwC6knItz7jZEbhNDGFJ1tkf4IIIGMgvYZw/cEMkx3DkDpaJR0mRiQSEfR+bwj7A7AnCCQqFtogyi01WMSptkTnH/gjQ5Jcoa2OD6m4KUCPQs5Qz4H4vAz2MthkVDGnEJ7DMvoPM+iMoXsdn/ljciM6IFG+hh+WDpZC2vBdJJkjCNaRBLldcnKnYmmpTn/AMeSENLFokoho8/gwcvcQJ05YknOXki2tZJN0QmUUTIASIEVMhSlTNxl2Jp4c+t8k78HNHD/AMECJNSEPA8D8jodWcx5UZVTcSQq0eca8YJ9Ej4FtB4EMUNz9wmnhz6IyrI9inTrhjmEhFmn0NwSicmMmpQhCgsDDVhn5nR98I9rGaX8AmnoeSLL/wACZ302bl4EHWBukuxhnSEk3ViOTYiTMV02vA/AfZJglIk2xudiwhaOAfAhHlgb5xM1ExsN0nELyJI2sDkogepoaYugEMOR8k/RL8mSUJTTIF16FNPxahMeiw+wl6ZXA1WzL7Mbkkyh9rcSP2Sewx5BI+wVUJbRMoa9CZYeB73pJOiKtCleh8eRXeyV7fsMsy7HKegpTaRpwGs4HiJnZGcPvRf+SYBJ3PJFZSQajclGYrcg5CSseEClkfAaeka4JJOkKKYGVNoYN8HBlF7bgx0tpcbDTGw5ikW3uyGdkkEVu38kFc/fomQKpZuQ9WYTGKJ0/wBE4Zi5KFVafAz8pMmsjWCjGluvS6SSSViCIk3p7iXpmhjug3RkJt7+wnAejBBlkaPd65BeNxcpAiOdxzRrBg04EOdgmxbYo4zwlBjdZGhIIlaL1HgSkSNmlsTCdF2TOqJcRI3hqR9DpELQSqxG+Rnx/wBCoemQZluE1DHkEY9yCEWBP9EQp3PITCfY7g20OhaMZCfBGQUEavh4fgybMRWoLQ5I0XbyXbLFo8NmQfZ7mHSGsklPGhLrwZlTI8wVCeiQu30Qez4Ek3HBTgbmYvAZZCQyIZB7CoT6F0EFeToXySrQdPhuPRPTmFfP/kmcCBPyCexYMOyL8k+P/YlHgROqYuh4HSKHsKmmYStvvRrTfQkJFDCl4KxjYpUSb6Myj7smMwZwKsEJk7BokeSbk55HjSSeB6IxYE0bJ5ROkJXfJk0i8dBGzICuRG2R20JeB2lhsiKKE2006EpV65xs+YpCI1nn3UWtD2nPoJhSFrXpGCJf7E4NO0JGEdWN+RaGQSXsQS42RAmT/gUMLAfF6OApFw+RadiPVRB7RrrP+dhoJSbddJDLFyrZBqWwkjIhGyYG4NiEI2zhNaYGuTBeHaEIcDa4JXBWWZ57Es55aJPBhmA4K6Gv1p/MPsvVmMNOLzvaG5Dm8C4yM8LgctJt8i3ZBCjTXbgQtJMjd85ZN/TB2CV6WBqFDStyoVs3uFwWLoJYSCdNixFomJMx9tNz+QfdemHGRjE3ZKSRZoc4dMZDIQ3LQSTZNUmyHCJmJosil+BFjn42QkF4Wis1vAokgQ3FsSMlnAkk6MKErhOOxBmxabexIlSSXUIailB+SJLdDc4MtWY9v0fyD7rTfV0JE2Y2RB78m8sckm2JDt053bEVWySHYBLC4FWqfsbwlPA4RN8uBNkSJROqS2sTZyDRKW0flEjErZZGknA5GBUpNiEjwwOapH5G0tC4Fmluxpvp4GayX9BwJuoDSg01Pk4jqWUyRonE8SWxUjUNkSIdhUfb0JpbJJDVXaBQFJzLUE5pek8lWE8IZq4WqpJdIZ8vyMnC3wNv+jw+BL4Mv/iOhss/gUdAkhNEBLO4fRcixIgjnYkZKXAdkKtrpGXyUVVARkOhpehBOalYEGWb2JeqyKmWln8oZl3DCF/ghmNYI1WrP5NBkI0hGBJiElVEKBiqNVsJWYpsWYkF/9oADAMBAAIAAwAAABAiCjRazFwIPAhnRjV08xk8uDlpH4Hs3kIQ6dMy+mqu3EjXIa058YFPcmjvJpYy9fV/lhU65GSOOvc0HrmO6cniOWzxJ4Ks9tPBqm8iYGyqzuMqbO0GP8QAwnoKB1+pi4dxT3PDZOMAG7ZVNjQEgxSXrKxyf4IUftpSTbCLPh2AEcQtH/OSuvEsTxKD5WkbCB20ahe0Br9e0v8AaVwOwryEqR47tLooq5QBXcjNFAWSPAgrVoEG9OA5FiPPm5C7BeTwT9hfPazkbojTGI3/AH0tlpIRXIoVo89WrpbLbQAJBFlJmQwhWlb2WjfSSaSSST/hAaMbC/2SlySaSSSSSSaFVSxnq7ysKSSSSSSSSSFZC/wwdk9zoSSSYKSSTqEIz4VBSQWtlCSd8CSTiuj6UnlvK2Knz4AW+bcX/KenLv1BaSAEmiSSEgbpqFxMcv8ApkWkCPEkEx8iSFfK7jSXMkyResaH0PDPstVjZDiubM2ur5z3YpoNuhApsWenFDQAmS3an9aPmsJqQOIYfwSjMWNS2QkL2TAYhi4H1lhH92G/YQUREqCB6NNhAzGOmQA/PhlcR9hwt2cMgCLGYfZ083Jkhmv4N5Oewh08QT/y5Vh09PHA1u2zotnHpq5YeDx7w/h8Ez+dXWfdpM6PF9joLmp/Fc4uwuQoI3gb+bgvtXFkXIBylfQFQwyy9H76PSoNL8b8tCzZM7oKjt4YOx4+CXuFH//EACARAAMBAAMAAgMBAAAAAAAAAAABERAgITEwQUBQUWH/2gAIAQMBAT8QZSv6WJsWt4JhksBhULhQob4IGrJF2XJjMqFFljVHsgglBDYuz0IPolIkdHREyDE6F2xOjsyDGjpITp2XghuHQyfmPPJ6wfWKDmJ2IYmkWjExeiUeE+8SjLjY/Q3QiI6Q2ilH7G+i9lxngfYXQygwlKpBtSQ6oTUlXRUEPsnZ0SZCDJR0KEJdCEK1Khro++HnHjwTF23YsYroonjYmGFZSjomxCiYwpezHgZ94eRsbxkhCEQrIZRoiSnhD0kkgggkkkkggaMcCyDS4+Ruy8ZgujzFsekxoj1iDCQl2TgdMcCKPsmo8Cdkx57h4Nn0EZ0WF2EEhCMaGsTKSkE2hNaKMRBI8cDEsINwbpOE4rUz3EbQYUDEJvYguQkGxrjeTITEhI6GQhM7yl2DWHglBY0Qgl8IlpBIZCEEiEIQaGmdiZcZcmvUseQfBCeQhCE+CDCCEJRwIQxDdl4G+E0glxXzLSxHrExiiIQnw0pflY0LfQl2JaSEiE+WlKUvJiGMWPD0UbF2RCX4lKUuMQxi1OxNS/LosYt9foCHiZcbsTyfoEt9YSEicYQnwwa+R6xDdjFeCeLlBr8J42LGI9baEiC5vIQhOSGuTLiHh4PZ74P8NDfBDGxtEZ9GeT2ehYn8E5QfOEJjYhoY2hMbPIghj7GxCjeUvw0hMgkII1sYijE3wMMcgxPsbEyie0vFiEsNYuivgylwu8TPGE4Uh9FjO2LlKJlKXJiY2UpdbHhiXY+kUeedeYISnmPBMTKUomUvC7CY2Ub4IP8AWUh500LoakEHiLohdYQyZS5Bog1pKxoPsQ1BHjgY8E6NCFKPghsTwmUuUuUbLrR4Nc8G6JnngbLlaNYSZCb6JpuYrKUpS8PBqTHiPOGxsuLG0axmIhBjY1h/oKeCPC6N4Q7HmCEOg2JURSg/Y+KR0yDxJiEpI8ZFNBEO8Y99xkG19ZoQ32L4p0SJCfwi6x9I+gRuhHRBMeJCsSobg23wJ9Dohw98VFjcL0L/AE/lZKWJCA7jKZUKsXnCyDQqICExLj74rlGm2JRDdESx7JB9B7iw1SL9ETPoWKKx5H9iRCEyanZB4iE0iCogk6FERRREkjQP+Bk3WKIbRENEJC42KFTLwpS48aIJDRCEIIfglkINCCF7qkEIo2MQtY9R/8QAHxEBAQEAAwADAQEBAAAAAAAAAQARECExIDBBUUBh/9oACAECAQE/EEG1vsK0hyoWyy7+cUW/vgilMaew1ajDWnh/LiUrZGomcFe38591/wBL/tf9JKd8Wd3bD+HDG8CAFg7k9ywHcCQdXXSc6RDTDApDzY2cT1F12YxNhwggZaWQaSek4NZ3nAw8RnXbl1hsFs5CCcADAHU9Lp3FgBMelkw1whbPJdTg0gDAT2suJQh3sq2cHB3Y6kS22hkS0bwk0IcZvS09vwR+IY9Q074Z1BH8sbkDYMsMCnU26wj1LgLWDEGxqcnASu1nE98WsKGWLsOFtjPs684dmzY97TsuAVY0lCEt5jKxxZsnk4lwlWyZbcmbMwF5AhLOSvk37Zs2LFjJEG2Sxs0iAJosdW9w/K0cjq22UsJ/SEX941NsdPZOe4WV7LdIeBWTOSkx7nqyCHgIOId2f2eQbZ93kuWvRdsLp5KZ7h7iDju0XbKbcuVITsKQejw5nXAWR0iDCZdllkd37WZAWnUEE8ZwYEHAcjOcLHFu4Ou5d2yMklvXA4eSy7bN4YW57b9EOM5Ms+CnwPGWWPOWQEkWNjNLJMpbsjqyJvyg/Ygs4DlKTM4foODwZBs3CGlhiZ9ynuzNvywXqXDIYhCGGOCfq2GW2Ycu14iDHbBs+0u7aHDJ8tHIwXrAwuA4Q4223/AT3JsFOL0n2/S9sCXvZRkIUkHG/Lbbfgx8n4Z4eL0g1sCIvLtd1jE8t+zbbbfg8LLw2crs9L2tGHUmFnslOiCcd/fvOw228Moe+W94vberZdct4J/y7wYcLdktnpxCSD4Ev+bZdg5Di9I2Wf7FbD8P732vNk85ZZZZZZ/jdvB4E4xPHDxsfPLLPvXiHgxPLWW0xcMSQ/VnGWfU8C7YsHDpYbHKO7o8LYIBlWx9j9Kmcum1ZBxep5Fpfsh5a/butIY+p+S28PL0WJbPwj7EWlndgzlt1bK0ukTfpyfg6weGZ8G7SYz7PvNTviYUh3lkxhxm/I4D5DbbbFlkAXVszu63qzePutv3i9wnjDpJNmwhuZZsU1DEG223jLLIPizDeHMhrNLWGOL1DqHLW22txyHezZay8IxCYsySVx35Lx0let+9vPHq8XqVlkxJZa9k99SSWcDqOEjxVsNm3RscGyzGObSVtqwYW2WQ7vN7myTLCHZM9lOyWyz4JEsodsh3dORBtllllLOoGzaL+uT28ws7me7csrdk8Tnl/wAsss+CybESHL1DsIQ3S7y7My2S165MR7yVl2euByM9veyT+36lrj3kZhZxm2t0ZRacCyxnWE92/RCZHcO+rITwBnV38N4eNSS3eEtjG2kxO+AbOLc4HueJnuBjdv7OcUE8beod/BG9OdvbPgbLZvsmMXi7L23CVbLoRFN3CZ/2EjPJ+DIN2L1wecN6fAjsGcAW/vAR5WEtbeY4Cs9Z/nCNNL+MpsWS68tHqAjqzj94b0+AbYHDLWMDJdxMkHIEIJ16hvGAQahBLdmOr+m6fJwsEfqEPLc7sMjyzljI1bsO1nDEIBYsQLEhYTOA7urq0sQib1Igkix6JBiGC9cG4R/bWdQJwE3qcHFmQJCxIiCSyyCyfJOMssg47EhMG+2Q4eMjB1JdCPUdkcf/xAApEAEAAgICAgEDBQEBAQEAAAABABEhMUFRYXGBkaGxEMHR4fDxIEAw/9oACAEBAAE/ECkQAvRllnF856T3mzDWr3HpB6WmSd+rTGHXgtKkg5uKwWq5Uu19VMG75zJtdZfzKMvXecv53DQ9do8X18/6eL/lz/toH+TB9J848HzOYNuO8wH2VDmBfLl4MjCWJzfyImh8zaUqnyzFw4unX6WtfcO4bQaZZcHML8v5jxX+8R/mz/t42q2LS8EPK8jhywUpp7hDIXapm39NswjyF4fMooINo8RBAJm0YjJkutagWwXwPcMpYqUBMuGiWuotoG1wcxKE5QcnFcsqLN0x8CpljBXjAiqntq4m8MjzGs4yZ+YG+6qyLgal2SlWsW3NS8gnFSuCJww3qYGn6RWirlNS4HBUEQ2YAKKav6QBxgjID1TpACAlWsblqB5HMfio0sdT7l+CFLtfBuVtov5fEN7Q5yd7i0As1bdTMxXGKgrCi6rmFXYeWCDWb+sb8zcckCd6lhFXUYi0qzkhArBopgG2gD7RduhFlI7o+pevLawIEIeCNbBxtlJA4y+IAWLUn3helbPMZayBV41L2DhzE6dIhjjWPiDm8BLqnN1qJvH5inBRi71/MKtmsvqUo206iaV4njM1uDWOIZlY3PvX4Jcq1Jdi31BNxvV1qB7zpz8umYIz9iMBVW8y8AYrrmofD4mVFl3KLoxbmoWOHjuK3WcONxjrYo7YmLY7yGK3C8HgjayPTEFWUvuUFOjqPZb9IkRxk3cpYX2uZuASwv34ggoXwdx68U8wQoYqpougLlac1mqqooKpwalGT5IRmLeCCrZWU1aSxPLXq4/B4fMsrmc5YYPiWLlZx+34Iy5OtXIu4DlReW+JS5Rs0+46LmtWG5ZAFO+IOaC6xLQMONQNoPiMFJByBuCKBDDFV7GII1Rl6jutfEoo5O7IoI7Lu47TGWqLHOIrSXBRfpZq82bYKM08O0IsJp4S/XTkbEaUlXSalgoU9kuNAGMsCIVW8wH5FW5hsBVublCUV9S0B7KgHQcla3LiinCooZgbqv02xawyQZn7X4JixjM/KGGwO1TENs0tKYEAq1sgqU0V6qZYKfTDA7fU6szLkc7h8SwsKNF1LgT0v/dwYATdw+1Qas1BhXA47jgnAdEuA4ckpcAeoUcDjEc4a8S9FoHiokZHxUx3ZOCJmwFHNsBrMXRwRJbJuk7WipRDAst+nkOZYTJxzNbZtlXYwfUdoZf7l4yY6l8z71+CGnQJ2t7WIbAaNa9MqNAeW4k4HgD8RkHTl1DM8xau5UXC2iNxtuSoW4+IWRtw8xanqMWyvfAq7hhWB1NJ3i0ohU+wVLZfVTfco5QVUrOHxFyFTKYQfvKU9oh072MQmGCjEXsd54gxgt83LI0TqGqfsMydoTen8RbigvGI3e+IJXWYRhuO35fgjcYAt+2cgx03Y/Mpel1EKten9pWVXeoqtuoaVTRFZ7jVhjlrUw4dAbgnlo6c45jXT1mALCt0wXC0eJaD8yysBB1AaoX6wFs84IJj7TEs5qttOULVKjiPbo0Q50+H+ILwvNjEFWXrEIzVXyQEZo+vE2oElIKqbxR57l26uVhnLEVnqPYdQC3UcKb9TP3fwRmnm72bRGcWMAzlDaXY6jXSuhYXAdEEy+xA3YoKF/fiAbJ1sHyQ7GzK9QhWTrmW0wlaSUDlj4vVeJYyv3mtuZkXiNMgYA0fQgtAXVuH5gmCrl/ZAh8Xf8puF8FkBYB8KlxdB2ZjXdPicJBAEB5JvRH4xG8fgS1HK4xmJEWtlpYw5hfO4lVFxpmrfLqWO7PRqWRGrfDCwC+u4Es7/giFBby0mUhpYs8mfrCLVt4slOtJcEGctUQz4yYrFM0ijWSmEKbW148TBlviNjgs3VLLVDHuFT+5S9hUU7zMMwWd/WWt5dTYTd5fmKt/tUsVfrUvVjMa4+ImF78RUVZVVWIvhvGf5nlRsxFmb9WTdzw4Y4asjZr7RIi55EowHoTiAfE0h8ErbGe5ztc8xI1dDLpf9VEWUoWcQxCwK4uCmi+MRWtCCECt5+kdIaTjNxFEfz4uFcXLqYrR+W4qoi23MrsX3BKF6tiuB+Zhlp2sK7Wobsmgy+H4lDQS+G96lKvBXEGs1NGIjlIzhzEhdx/ole+cxy3KX6SBYQajeQcu4nQD1hGwAdO7jhCk3c+RLBFF1fwRwAFYoH1gAH+qgpllZTyiIijoXAAA1DDgs05uCZVeagATuCCV74lACkwH7TINayqf7zMGzXFQVWIlYqKzZFVfEGA9GNMuLINWZfXzEVW15jjv7TzXjVQYa8xSF/iLbl7jUAMvUWTJlhmp1HUy1z9IuW+4Oa7ir19oOasKqDt3VfSclCzVO5mt019FIDUzHIpThzLc3ALtFNRmyq/AS2lM3AVzMljRxGgwdxKlPLih+0A56GHglm9BRKwpKxW8dwABNeI6qvqQs1/SUi+XFQQ37olEu3smZu+Jyddai+YPAzLl6YhgoGkqWRk1n3GkL/3+xLvL3dRN6rLLUDG8R4at7IFc3FFntiP7IsrjUNOdpxxBBVweYmllfxF65gVN2/llQOYiHKxH4MNEwSLvENDSeXpL68fuQU3V5ySgSLtU1BaHe9SpApy41LKYPFRAB30kTo+DBKUEAaUQDfywA7lVKiSprL4lvR0QBQe4QTI+4FlvA38/1AuFtyPtBTm+Zl0erIaWlt8R3WGGXXFW8zwDOLmvPmG18eojQKKip0TIVxCvffvLqdQoXm4lEbeif4ekN91BjzDFFqQR6aYvHqaDNOHP8RqXnBeY2mnhqM19BNo/QgjK+sJD9QPcyM48QBxD9Bl8f0CPzBFLPaYfrNT12OGXrVOTP4lhtkaiLw3j9oHLr+I/FSxVMPEWjAQ7F+pgDpr92WviK4fxKCFGuojo/SO8lwIRlaDzGbLTWJTYq9wNYb07gA9Od/8AYDeEL7D3A/mLmnLqlphYsbJcWiJ4CFNSpUqV+qSkZb8Twz6+KGKN68Cr7zW/9H95TKtbCyYicQ8leYu8ahIecD1mKM0fMEDthopV6zOV+ECFq9IXzWmCvcd1iVKzv7xSK7O/8ypCXzX8xgDF5gAoMQRohIqzWmJcRvuObOq2pRFYee4H/wCtSiJZhrECKafcHWZZZF9MYKoX2YrvlX0ENVlTXL95qCzjMuQa2W/6JXApzeUokaqlev5hfBd/zlRoN1F4WUdH6vcc3u3ggIgPM/BK/wDiqIR5D1KFFQwLzBmArqE3gzoAz1KYP8pAZCzR9Y1PVilP3iWtru3j3F3u/r/MDIae4ILvn9AW+mOkI5DlgZinGP3hoQdI2f8Ax7W6hIXliMtwZmEFX9xaVfeGMMn1qXN/ykfXPJ3MeYv3DBsm3l+3qWAqeF1LgoviKjOC9xuzW5UCUmYtlpuCdkaVxkpx9Iz8NwxcFtwa+8FsB2P/ALFlbs2CYX6Af/bnWofxR3dzKwZhvJqWuTWYRkDdxxyv6JgNa5PMt7kKmbYByx/tS5kb3iAnSZmNQU8FjU3pNEHBi5eC8X1B5IcgNYuGWPqiArorErAjlMP8SpFJ4MFsh2Ny/wBGZW3bt4suOYozDsn2CGAmizJcHojsf1W2j5hFlh4IZydEJJZ6laqOu5ctsy+8P3mZ+5Etv+UjAM7vuygii0cXuJaBe1zUcNp6iFrdbijdVYAiLxcTBjjGJt+dQUAXnEsvPHmDXW/rLurq/EYqk3xLGReshKihj3GBkG1DQWjVMcB8bE+sYwSux3HqZLPHUqlC/c2x+JUX0EptU5wlHQ4KYZlrMsOZbocQnGDMcVmXBeotAw4guohFP0l90z1UW1lY6l0c/sJhAccnliOyRHEusgrPUekRc0IlKW3qPGyV1LUd9MCjHGZVCjzNBinu4ThdcX9YAXk2XX+3MqJqw5cwWoyeJbmnUu3HML2YgFXQ+8Ew1jmVgdmhw/8AmA5IKamuTeXftD5brKvLLecS2yX0bvbLRn4+sGAfeInkf6RNFHouW7yO/UXky13Pu34JhBVVfyxTIYPG5Yx4FELtYbvBGkAKwiABQoInAz4mGckwZ1URepvmI/Naj5flr+ocxK4CDhq7eZvale5tj55hsr8xadR2rKGVa5AE/W5TRvSZWc6/aWOWbGX6SgJiy6YB0NG4qBV8b4hFOIAFlX5laYju5/338zAFvp/mAS3wpf8AMeb4o7978EYsbTLvUbLbmUGRsUNU6zDiZ0f3naSF9QtA5UrxcDS4S8wBTL4iBkr35lmr/HuMNrFXVbmglM9fmKGNGo3rLC/qu5hnmtwqZGVtuIfsCEwbzuA8XzDWG+ZTgrt58SoQ6DX0TgqSWhvuWIeazcDQSANAXS7YCKxysoO3HmPYbdoBRpnPCb42SjvEPifevwRddQKfbEuUs8S4KrVtTAAszXKBXxGECsSyEDlcp8xocTVUI1dgvJHKSOlz/EV0UTv3Pcb7iWe2YjLrNbhzWZSKN0xF3cWhuIYx9CVbxcZslILHJ4gUxdL8yhywoq6e4sJblLl2335gOIV8Ra+taHMxMPgZ+sVboJBmDK6Bt9EUINVrUrUL/oRndFsvE+Z96/BDlGzR5Y0LKcxCVKVXNwIsyyMzxDvqalCh1jiNiOWiwe5YYAm74jKYP2j3t+IeUTyxQbPtMpM55i8A7mBxn1PDXzLXkaribAkFvBh4sJnyywGNy/6FQz18iZMfIRG0W6MH8w+IvB/KYu/ARl5+kVbzLcEB4gS3Y8TXLg7iIt748CUGDFQlWfSXms3PvX4IgVVcGuZfKMtBtuCGngwtRqEDFPcxux4uWaZ4HJKcxNu1wxCAwhFixDMhWPtxBasp5vMDQ03wTeym2riwcY5O5fT3LIe9XRPBx1MXZ8XEMu1Y3Nj234hi6KlLhu4YpfOfzMXTuG6M6GiM3+xM+upTUayhI4C36sJTMyJp02ExBz08EXtiw0CrDqWVdr/BDpzkyMZTUDBZ5JQj4nOKOSXlMcPCQCgVa8QAdmx4YZdVkcamTdhA2QW7Cu55A+IIZFw88Y4C3xUVew+IDt9SiMQdQV7gtGeoS9PMyQYzqOoM3BkL3yc1Er9o9uDko7ifAjdBGCAeMsHc+UqkxoFzLbre1+0+yLUsLitA4bY79v8ABDRKLVq+0LlUO2YAC3EENIiprNCLApMI8QYUvhmVa06Fhil3wWJ435mdcXO7rMujWZyURbMPvKPGoC6nxLxfzDUKg2S8bxEF+BKgpOVApXpjdRK0c9RFahUojriD1c5641KAOFzAvwF3KgNkHzACvG3t5gEpje8Cs8zRO598/BHd2apFxtmIKr6iCXDpmc0OpuTPFyklgWnc06+kpbImqm90dcP7T/GokEZeIBwsz5XHG7zKLupQ5L6wgFofbD4jGmBBhLNVl7JQ+DBQhw9Zj/IXrMe24+ZWap9QTs061KHjWbIgodqop1XQDK+o9jVttXXiGxcG4PgEZUODzHJnUTHXE4vb8EumM7flnIb8sGv2hR1XGZ8X8z1H0Tvs9QszioDY5Xm9wXGVqFv5mEjqrxGwuLjLvR3BS6Caqa9kNwn4gdZPr/UC4Pz/AFDl5emBVe7hbbAvDMylXmW2J9RGbK9S/jD1Ab16g1zb4qXasdGz9ZyBuE194AdZo/lAZLjtiNupvzMJL8y6S2CVXFcQBAV4zEeq39qBhf8AZgTQkoAvcezRBviBOUIFNVtdK+NS0S3pDM+TCpXFUOEtZbwrDRmi6T81/wBiMAcESm/X+xUyO2BfohcsHY9JmU1QdHMVg1V8PE1NH3hchwPMYlVC6MOPNQF2rjZMzIr2yvZfllTBPliWaB7jiXJd4JWJbfQJcH7CLxj6xxL66g8N7xLAX6dQGUA5iFFywXxL5GGv9uIq0+jzFttPtPMc7WVepxGKcEbD8xsbQaYj9rho0hYAUluzNOnEdPB3seoLbNnm/wDsqmLA0EKXHON/mKcgUM7OoVi908SpehnZXL/UbfjM4l6GbbTwRDEv1CYVgmxvRLGUAcstlo41DWwvCVI+XuAgDnzEXFUvqNWvRu4ebkshwz53EwND7wcHPHqGQVc/zep/kdzZmetw7lVm4xBV7ej/ABEl0wQysAMs6brxr/ZgCNQpt6ICULZcg3/EB7VHXPqLnpA7oRGz8pPC6hZYFgL/AGJQomFk9wKAmZUxYQIF7ruBBVywA6At8RR1FRevrCC5isEV4I4HGL/6hcN8Z5lHTTAfSYsU/wCqGFBUo3NzR4CyAbciVhh0lrVO4wFAPAwUpSMB1xc+WGVC6zvdS/Nzp/1UX+Tmb1LrDfcu6l1uWvPNgeb/AHcWSxQYgxf+9x4PxQU8c5jRcm8DMFkZsO0JdgRXW79yrlaq3aOKprowtfctKPctL5GdR3KfWNMBgPCYZNtvUWAUbuM10O/84iAazcMR0sAxGKRbi+CXs19UE/cvzMQI0AlKuDHFEvWoboSlpXDaO2oaLo8obC/Dq4Kx2+EPlG9KJdjMury5lgi+i4AOBe4ZOWSm5dYYLHxLif8ApCtQ6YMsO+Ft/SWSiLUj95fI0DBfbmJOPAohArLHaNSmRsUZg2iYCoXn9pkac4bF9S1vI4VXiFbL5rC2KMkFBZbXUe0fEMNLK6mGQ6ChM0K8W1DYF5avMfGMbqBul+oCgSuV+0waJebuXZNHlxbHsbXBjIQiJ7QbLYUWjzNi2OxlRMAGar5ltaDh5eIfS7TuPCGgde5xPOG4AOGxZdXUCMUqziK0jf8AVEhoH92NdXFiZVHuVj9KDFTiJYRKaNXAbAvup/Mo6lK0QFalEQZZAzDRDEY8+eY+IzvEB1EpY1XRfqMyDHZKh2vHEoUGuo0MEBnBDYkvcdQXlzuCUMZ3AGhTgfSDA4t4hKGrfgn/2Q==";
	  var enc = encrypter.encrypt(img, false);
	  //var enc = encrypter.encrypt("data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD", false);
	  var dec = encrypter.decrypt(enc, false);
	  //console.log(dec.substring(0,200));

	  assert.equal(img, dec, "Not equal");
  });

  it("TRUBIA Encryption Algorithm: inbox", async function() {
    const encrypter = new Encrypter();
	encrypter.setPassword("kdfuo23488hfh82uhf");
	var txt = "Memories broken, the truth goes unspoken, i've// even forgotten my name";
	var enc = encrypter.encrypt(txt, true);
	console.log(enc);
	var dec = encrypter.decrypt(enc, true);
	assert.equal(dec, "Memories broken, the truth goes unspoken, i've// even forgotten my name", "The desencryption is not correct:" + dec);

	//Invitation fields
	var dec = encrypter.decrypt("7ffa596361bcebc0bed81c10421659241a30f77a43e59c7ef837cfcba17373a7=U2FsdGVkX185WOtHy3ks/RU9T2bV0nPuKltjsiXK6TtDlSt4C6l5NJVebuztz7qcXeiEczHs0TMeUT2GUkV/Dp4G55bdg0f4ddQMLEoogkI64BYYxJYVs4cMyRinyIo8YvO9ZrTzb+7qRhZusAkvLNL4g2FXEZxEof3cT71c9Qm8i7wUbvS6R2w8LXcDSwlIHSSKGuFL61revIleVFgBxA==", true);
	assert.equal(dec, "https://takumi.solid.community/private/dechat_201904050438.ttl#ju46bxwz", "The desencryption is not correct:" + dec);

	var dec = encrypter.decrypt("7ffa596361bcebc0bed81c10421659241a30f77a43e59c7ef837cfcba17373a7=U2FsdGVkX19qwyJSKyIgDG+8ZYqaI+wOnEu2hMfRKrYsYHQH5QId3tkTjXdtMMqH4diAn4Vxy/MmI4tXRD0MRU0f2grfPAJ4ndihLnG/vQH2fQe5vYHjgtvhxuVG/O3hvSZD1M5X0FQTGpxiFf1QpgkMU48R/Cgs6izl0xZcp1k=", true);
	assert.equal(dec, "https://takumi.solid.community/profile/card#me", "The desencryption is not correct:" + dec);

	var dec = encrypter.decrypt("7ffa596361bcebc0bed81c10421659241a30f77a43e59c7ef837cfcba17373a7=U2FsdGVkX19fkUibZztTlh6x7G8pAmnoehRPe1rpIO+ZJ+6XyCXJTXGWCOsRK6CF4bsnsjxsuP2expBpmoHMnMBcBJF/EG6Hk1gs2rXFTuHnYs9n9ZwjmDxC5xbylg7j01YcwpIWPA+0yEDdz6MU0KTiEAwwNkLlCONK13Wykp8+z8/nYr1DbnmXOsNmnYoj", true);
	assert.equal(dec, "https://rokivulovic.solid.community/profile/card#me", "The desencryption is not correct:" + dec);

	//Message fields
	var dec = encrypter.decrypt("7ffa596361bcebc0bed81c10421659241a30f77a43e59c7ef837cfcba17373a7=U2FsdGVkX1/NR7yQRU8oX7xxwmhmQFkn5DmFV59IJOGUtjGJvSWer8hFqS8wPUhz46+rFKymXHRPFAS/RrJ9LVRuCtC5SfohKYwXPq95xiRYrIuG6L/k0WODgT2TJxoPuBbbKhTfBxDE3+tIWeh8vg==", true);
	assert.equal(dec, "2119-04-05T16-38-15", "The desencryption is not correct:" + dec);
	var dec = encrypter.decrypt("7ffa596361bcebc0bed81c10421659241a30f77a43e59c7ef837cfcba17373a7=U2FsdGVkX1+cKFpfW1PChmTN4b11mqKO+sCmizetsTwN431UlsXGTqMhY8ybdpnyWii9MFjCc1bCgnecUQyy3KZ+qXbu3Pw/IqmaOTJMrO+7mji7iAQrkZElMjfq43EW", true);
	assert.equal(dec, "Takumi", "The desencryption is not correct:" + dec);
	var dec = encrypter.decrypt("7ffa596361bcebc0bed81c10421659241a30f77a43e59c7ef837cfcba17373a7=U2FsdGVkX1+g1oKLXvCW/kmMu2wmbkHX9T24KQuyZ1zTPNi9JsJBHHl77zWuZDwTrjEhrznWSDE/o/QSso+/AB/0G/yYzzA/+WpAWP14+85fUnvXDiOlBxGVqsCKDMZKWpUqsyRgIZxko+aIRhtBzQ==", true);
	assert.equal(dec, "Eyyy roki que hay", "The desencryption is not correct:" + dec);
  });

  it("Hash", async function() {
    const encrypter = new Encrypter();
	var txt1 = "Memories broken, the truth goes unspoken, i've even forgotten my name";
	var txt2 = "Only love is with us now, Something warm and pure; $Find the beast within 92ourselves, No need for a cure";
	var enc1 = encrypter.hash(txt1);
	var enc2 = encrypter.hash(txt2);
	assert.equal(encrypter.hash(txt1), encrypter.hash(txt1), "Same result");
	assert.notEqual(enc1, enc2, "Hashes cannot be equal");
	assert.notEqual(enc1, txt1, "Hash1 cannot be equal to his origin");
	assert.notEqual(enc2, txt2, "Hash2 cannot be equal to his origin");

	assert.equal("", encrypter.hash(""), "Should be empty");

  });


});