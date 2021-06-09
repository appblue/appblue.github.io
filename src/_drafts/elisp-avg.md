## Average calculation using function

```lisp
;; Average calculation using function and dolist
(defun favg (l)
  (let ((sum 0))
    (dolist (i l sum)
      (setf sum (+ sum i)))
    (/ sum (float (length l)))))

(favg '(5 2)) ;; RESULT: 3.5
```

## Average calculation using macros

```lisp
;; Average calculation using macro
(defmacro mavg (l)
  `(/ (+ ,@l) (float (length ',l))))

(mavg (5 2)) ;; RESULT: 3.5
```
